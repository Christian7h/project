import { useParams } from "react-router-dom";
import { vehicles } from "../data";
import { Car, Clock3, Settings,ShoppingCart } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import LightGallery from "lightgallery/react";
import { useCart } from '../context/CartContext';

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { useLanguage } from '../context/LanguageContext.jsx'; // Importa el contexto para el idioma

export default function VehicleDetail() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const vehicle = vehicles.find((v) => v.id === vehicleId);
  const { language } = useLanguage();  // Obtén el idioma actual del contexto
  const { addToCart } = useCart();

  if (!vehicle) {
    return <LoadingSpinner />;
  }

  // Obtener las traducciones según el idioma
  const vehicleName = vehicle.translations?.[language]?.name || vehicle.name;
  const vehicleDescription = vehicle.translations?.[language]?.description || vehicle.description;
  const vehiclePrice = vehicle.translations?.[language]?.price || vehicle.price;
  const power = vehicle.translations?.[language]?.specs?.power || vehicle.specs.power;
  const acceleration = vehicle.translations?.[language]?.specs?.acceleration || vehicle.specs.acceleration;
  const topSpeed = vehicle.translations?.[language]?.specs?.topSpeed || vehicle.specs.topSpeed;

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'CLP'
    }).format(parseInt(price));
  };
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-200 pt-24">
      <div className="container mx-auto px-4">
        <div className="gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Imagen */}
            <div>
              <img
                src={vehicle.image}
                alt={vehicleName}
                className="w-full rounded-lg"
              />
            </div>

            {/* Detalles */}
            <div className="space-y-8">
              <h1 className="text-4xl font-bold mb-4">{vehicleName}</h1>
              <p className="text-2xl text-bmw-blue mb-6">{formatPrice(vehiclePrice)}</p>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {vehicleDescription}
              </p>

              {/* Especificaciones */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center hover:scale-105 transition duration-500">
                  <Settings className="w-8 h-8 mx-auto mb-2 text-bmw-blue" />
                  <p className="text-2xl font-bold">{power}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Power</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center hover:scale-105 transition duration-500">
                  <Clock3 className="w-8 h-8 mx-auto mb-2 text-bmw-blue" />
                  <p className="text-2xl font-bold">{acceleration}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    0-60 mph
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center hover:scale-105 transition duration-500">
                  <Car className="w-8 h-8 mx-auto mb-2 text-bmw-blue" />
                  <p className="text-2xl font-bold">{topSpeed}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Top Speed
                  </p>
                </div>
              </div>
              <button 
                onClick={() => addToCart(vehicle.id)}
                disabled={vehicle.stock === 0}
                className="w-full flex items-center justify-center gap-2 bg-bmw-blue text-white py-3 rounded-lg hover:bg-bmw-blue/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
            {language === 'es' ? 'añadir a la cesta' : 'Add to Cart'}
              </button>
              {/* Botón */}
              <button className="w-full bg-bmw-blue text-white py-3 rounded-lg mt-8 hover:bg-bmw-blue/90 transition">
            {language === 'es' ? 'Programar prueba de manejo' : 'Schedule a test drive'}
              </button>
            </div>
          </div>
          <div className="col-span-2">
            <h2 className="text-3xl font-bold py-5">
            {language === 'es' ? 'Galería' : 'Gallery'}
              </h2>
            <LightGallery
              onInit={onInit}
              speed={500}
              plugins={[lgThumbnail, lgZoom]}
              addClass=""
              elementClassNames="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {vehicle.images.map((image, index) => (
                <a href={image} key={index}>
                  <img
                    src={image}
                    alt={`${vehicleName} ${index}`}
                    className="w-full rounded-lg hover:scale-105 transition duration-500"
                  />
                </a>
              ))}
            </LightGallery>
          </div>
        </div>
      </div>
    </div>
  );
}
