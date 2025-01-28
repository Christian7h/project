import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { brands, vehicles } from "../data";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLanguage } from "../context/LanguageContext";

function BrandInfo({ brand, language }) {
  const { name, description, history, trajectory, foundation } =
    brand.translations?.[language] || brand;

  return (
    <div className="mb-12">
      <h1 className="text-4xl font-bold mb-4">{name}</h1>
      <p className="text-2xl text-gray-600 dark:text-gray-300 mb-6">
        {description}
      </p>

      <div className="group relative shadow-2xl dark:shadow-xl rounded-lg p-6 bg-zinc-100 dark:bg-zinc-900 transition-all duration-300 hover:shadow-3xl">
        <div className="grid md:grid-cols-2 gap-8 p-6 rounded-xl">
          {foundation && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-bmw-blue dark:text-bmw-lightblue">
                {language === "es" ? "Fundación" : "Foundation"}
              </h3>
              <p className="text-xl">{foundation}</p>
            </div>
          )}
          {history && (
            <div>
              <h3 className="text-lg font-semibold text-bmw-blue dark:text-bmw-lightblue mb-2">
                {language === "es" ? "Historia" : "History"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {history}
              </p>
            </div>
          )}
          {trajectory && (
            <div>
              <h3 className="text-lg font-semibold text-bmw-blue dark:text-bmw-lightblue mb-2">
                {language === "es" ? "Trayectoria" : "Trajectory"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {trajectory}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VehicleList({ vehicles, language }) {
  if (vehicles.length === 0) {
    return (
      <p className="text-xl text-gray-500 dark:text-gray-400">
        {language === "es"
          ? "No hay modelos disponibles para esta marca."
          : "No models available for this brand."}
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {vehicles.map((vehicle) => {
        const { name, description, price } =
          vehicle.translations?.[language] || vehicle;

        const formattedPrice = new Intl.NumberFormat("es-CL", {
          style: "currency",
          currency: "CLP",
        }).format(vehicle.price);
        
        return (
          <Link
            key={vehicle.id}
            to={`/vehicles/${vehicle.id}`}
            className="group relative bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            {/* Imagen del vehículo */}
            <div className="hover-scale aspect-video relative overflow-hidden">
              <img
                src={vehicle.image}
                alt={name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition duration-300"></div>
            </div>
            {/* Contenido del vehículo */}
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-bmw-blue transition-colors">
                {name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {description}
              </p>
              <p className="text-xl font-semibold text-bmw-blue dark:text-bmw-lightblue">
                {formattedPrice}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default function BrandPage() {
  const { brandId } = useParams<{ brandId: string }>();
  const { language } = useLanguage();

  const brand = useMemo(() => brands.find((b) => b.id === brandId), [brandId]);
  const brandVehicles = useMemo(
    () => vehicles.filter((v) => v.brandId === brandId),
    [brandId]
  );

  if (!brand) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-200 pt-24">
      <div className="container mx-auto px-4">
        <BrandInfo brand={brand} language={language} />
        <h2 className="text-3xl font-bold mb-8">
          {language === "es" ? "Modelos destacados" : "Featured Models"}
        </h2>
        <VehicleList vehicles={brandVehicles} language={language} />
      </div>
    </div>
  );
}
