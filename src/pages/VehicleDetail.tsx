import { useMemo, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Car, Clock3, Settings, ShoppingCart } from "lucide-react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { DiscussionEmbed } from 'disqus-react';
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { vehicles } from "../data";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";



type SpecItem = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

const VehicleDetail = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const { addToCart } = useCart();
  const { language } = useLanguage();

  const vehicle = useMemo(
    () => vehicles.find((v) => v.id === vehicleId),
    [vehicleId]
  );

  const translations = useMemo(
    () => ({
      name: vehicle?.translations?.[language]?.name || vehicle?.name || "",
      description:
        vehicle?.translations?.[language]?.description ||
        vehicle?.description ||
        "",
      price: vehicle?.translations?.[language]?.price || vehicle?.price || "0",
      specs: {
        power:
          vehicle?.translations?.[language]?.specs?.power ||
          vehicle?.specs.power ||
          "",
        acceleration:
          vehicle?.translations?.[language]?.specs?.acceleration ||
          vehicle?.specs.acceleration ||
          "",
        topSpeed:
          vehicle?.translations?.[language]?.specs?.topSpeed ||
          vehicle?.specs.topSpeed ||
          "",
      },
    }),
    [vehicle, language]
  );

  const formatPrice = useCallback((price: string) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(Number(price));
  }, []);

  const specs: SpecItem[] = useMemo(
    () => [
      {
        icon: <Settings className="w-8 h-8 mx-auto mb-2 text-bmw-blue" />,
        value: translations.specs.power,
        label: "Power",
      },
      {
        icon: <Clock3 className="w-8 h-8 mx-auto mb-2 text-bmw-blue" />,
        value: translations.specs.acceleration,
        label: "0-60 mph",
      },
      {
        icon: <Car className="w-8 h-8 mx-auto mb-2 text-bmw-blue" />,
        value: translations.specs.topSpeed,
        label: "Top Speed",
      },
    ],
    [translations.specs]
  );

  const galleryImages = useMemo(
    () =>
      vehicle?.images.map((image, index) => (
        <a href={image} key={`${vehicle.id}-${index}`}>
          <img
            loading="lazy"
            src={image}
            alt={`${translations.name} ${index + 1}`}
            className="w-full rounded-lg hover:scale-105 transition duration-500"
            width={400}
            height={300}
          />
        </a>
      )),
    [vehicle?.images, translations.name, vehicle?.id]
  );

  const filteredRecommended = useMemo(() => {
    if (!vehicle) return [];

    // 1. Filtrar vehículos de la misma marca
    const sameBrand = vehicles.filter(
      (v) => v.brand === vehicle.brand && v.id !== vehicleId
    );

    // 2. Filtrar por tipo de vehículo similar
    const sameType = vehicles.filter(
      (v) =>
        v.type === vehicle.type && v.id !== vehicleId && !sameBrand.includes(v)
    );

    // 3. Mezclar resultados y tomar 4
    const recommended = [...sameBrand, ...sameType]
      .sort((a, b) => {
        // Priorizar precio similar
        const priceDiffA = Math.abs(a.price - vehicle.price);
        const priceDiffB = Math.abs(b.price - vehicle.price);
        return priceDiffA - priceDiffB;
      })
      .slice(0, 4);

    // Si no hay suficientes, completar aleatoriamente
    if (recommended.length < 4) {
      const remaining = vehicles
        .filter((v) => !recommended.includes(v) && v.id !== vehicleId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4 - recommended.length);

      return [...recommended, ...remaining];
    }

    return recommended;
  }, [vehicles, vehicleId, vehicle]);

  if (!vehicle) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-200 pt-24">
      <div className="container mx-auto px-4">
        {/* Hero Section del vehículo */}
        <div className="relative mb-16 rounded-2xl overflow-hidden shadow-2xl">
          {/* Imagen principal con overlay */}
          <div className="relative h-[400px] md:h-[600px]">
            <img
              src={vehicle.image}
              alt={translations.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
            
            {/* Contenido superpuesto */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                  {translations.name}
                </h1>
                <p className="text-2xl md:text-3xl font-bold text-bmw-lightblue mb-4 drop-shadow-lg">
                  {formatPrice(translations.price)}
                </p>
                <p className="text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed drop-shadow-md">
                  {translations.description}
                </p>
              </div>
            </div>
            
            {/* Badge de precio flotante */}
            <div className="absolute top-8 right-8">
              <div className="bg-bmw-blue/90 backdrop-blur-md text-white px-6 py-3 rounded-xl shadow-xl border border-white/20">
                <p className="text-sm font-medium">Precio</p>
                <p className="text-xl font-bold">{formatPrice(translations.price)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de especificaciones mejorada */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {language === "es" ? "Especificaciones técnicas" : "Technical Specifications"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {specs.map(({ icon, value, label }, index) => (
              <div
                key={`${label}-${index}`}
                className="group relative bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200 dark:border-zinc-700 hover:border-bmw-blue/30 dark:hover:border-bmw-lightblue/30 text-center"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bmw-blue to-bmw-lightblue rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>
                <p className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">{value}</p>
                <p className="text-sm font-medium text-bmw-blue dark:text-bmw-lightblue uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Botones de acción mejorados */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <button
              onClick={() => addToCart(vehicle.id)}
              disabled={vehicle.stock === 0}
              className="group relative overflow-hidden bg-gradient-to-r from-bmw-blue to-bmw-lightblue text-white py-4 px-8 rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              aria-label={language === "es" ? "Añadir al carrito" : "Add to cart"}
            >
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="relative flex items-center justify-center gap-3">
                <ShoppingCart className="w-6 h-6" />
                <span className="text-lg font-semibold">
                  {language === "es" ? "Añadir a la cesta" : "Add to Cart"}
                </span>
              </div>
            </button>

            <button
              className="group relative overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white py-4 px-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              aria-label={
                language === "es" ? "Programar prueba de manejo" : "Schedule test drive"
              }
            >
              <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="relative flex items-center justify-center gap-3">
                <Car className="w-6 h-6" />
                <span className="text-lg font-semibold">
                  {language === "es"
                    ? "Prueba de manejo"
                    : "Test Drive"}
                </span>
              </div>
            </button>
          </div>
        </div>

        <GallerySection language={language} galleryImages={galleryImages} />

        <div className="mt-16 px-4">
          <h2 className="text-3xl font-bold mb-8">
            {language === "es"
              ? "Vehículos recomendados"
              : "Recommended Vehicles"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredRecommended.map((recommendedVehicle) => {
              const vehicleTranslations = recommendedVehicle.translations?.[language] as { name?: string; description?: string } || {};
              const vehicleName = vehicleTranslations.name || recommendedVehicle.name;
              const vehicleDescription = vehicleTranslations.description || recommendedVehicle.description;
              
              return (
                <Link
                  key={recommendedVehicle.id}
                  to={`/vehicles/${recommendedVehicle.id}`}
                  className="group relative bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <div className="hover-scale aspect-video relative overflow-hidden">
                    <img
                      src={recommendedVehicle.image}
                      alt={vehicleName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-bmw-blue transition-colors">
                      {vehicleName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {vehicleDescription}
                    </p>
                    <p className="text-xl font-semibold text-bmw-blue dark:text-bmw-lightblue">
                      {formatPrice(recommendedVehicle.price.toString())}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        {/* Disqus comment section */}
        <div className="mt-16 px-4">
          <DiscussionEmbed
            shortname="start-knai8pmag4" // Reemplaza con tu shortname de Disqus
            config={{
              identifier: vehicleId, // El ID del vehículo para que cada vehículo tenga su propia sección de comentarios
              title: translations.name, // El título del vehículo
              url: window.location.href, // URL actual para que se use como la base de los comentarios
            }}
          />
        </div>
      </div>
    </div>
  );
};

const GallerySection = ({
  language,
  galleryImages,
}: {
  language: string;
  galleryImages: React.ReactNode;
}) => (
  <div className="col-span-2">
    <h2 className="text-3xl font-bold py-5">
      {language === "es" ? "Galería" : "Gallery"}
    </h2>
    <LightGallery
      speed={500}
      plugins={[lgThumbnail, lgZoom]}
      elementClassNames="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {galleryImages}
    </LightGallery>
  </div>
);

export default VehicleDetail;
