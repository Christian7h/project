import { useMemo, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Car, Clock3, Settings, ShoppingCart } from "lucide-react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <img
              src={vehicle.image}
              alt={translations.name}
              loading="lazy"
              className="w-full rounded-lg"
              width={800}
              height={600}
            />
          </div>

          <div className="space-y-8">
            <h1 className="text-4xl font-bold">{translations.name}</h1>
            <p className="text-2xl text-bmw-blue">
              {formatPrice(translations.price)}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {translations.description}
            </p>

            <div className="grid grid-cols-3 gap-6">
              {specs.map(({ icon, value, label }, index) => (
                <SpecCard
                  key={`${label}-${index}`}
                  icon={icon}
                  value={value}
                  label={label}
                />
              ))}
            </div>

            <ActionButtons
              vehicleId={vehicle.id}
              stock={vehicle.stock}
              addToCart={addToCart}
              language={language}
            />
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
            {filteredRecommended.map((vehicle) => {
              const translations = vehicle.translations?.[language] || {};
              return (
                <Link
                  key={vehicle.id}
                  to={`/vehicles/${vehicle.id}`}
                  className="group relative bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <div className="hover-scale aspect-video relative overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={translations.name || vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-bmw-blue transition-colors">
                      {translations.name || vehicle.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {translations.description || vehicle.description}
                    </p>
                    <p className="text-xl font-semibold text-bmw-blue dark:text-bmw-lightblue">
                      {formatPrice(vehicle.price.toString())}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecCard = ({ icon, value, label }: SpecItem) => (
  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center hover:scale-105 transition duration-500">
    {icon}
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
  </div>
);

const ActionButtons = ({
  vehicleId,
  stock,
  addToCart,
  language,
}: {
  vehicleId: string;
  stock: number;
  addToCart: (id: string) => void;
  language: string;
}) => (
  <>
    <button
      onClick={() => addToCart(vehicleId)}
      disabled={stock === 0}
      className="w-full flex items-center justify-center gap-2 bg-bmw-blue text-white py-3 rounded-lg hover:bg-bmw-blue/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={language === "es" ? "Añadir al carrito" : "Add to cart"}
    >
      <ShoppingCart className="w-5 h-5" />
      {language === "es" ? "Añadir a la cesta" : "Add to Cart"}
    </button>

    <button
      className="w-full bg-bmw-blue text-white py-3 rounded-lg hover:bg-bmw-blue/90 transition"
      aria-label={
        language === "es" ? "Programar prueba de manejo" : "Schedule test drive"
      }
    >
      {language === "es"
        ? "Programar prueba de manejo"
        : "Schedule a test drive"}
    </button>
  </>
);

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
