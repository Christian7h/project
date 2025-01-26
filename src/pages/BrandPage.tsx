import { useParams, Link } from "react-router-dom";
import { brands, vehicles } from "../data";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLanguage } from "../context/LanguageContext";

export default function BrandPage() {
  const { brandId } = useParams<{ brandId: string }>();
  const { language } = useLanguage();

  const brand = brands.find((b) => b.id === brandId);
  if (!brand) {
    return <LoadingSpinner />;
  }

  const brandVehicles = vehicles.filter((v) => v.brandId === brandId);

  // Nuevas traducciones añadidas
  const brandName = brand.translations?.[language]?.name || brand.name;
  const brandDescription =
    brand.translations?.[language]?.description || brand.description;
  const brandHistory = brand.translations?.[language]?.history || brand.history;
  const brandTrajectory =
    brand.translations?.[language]?.trajectory || brand.trajectory;
  const brandFoundation =
    brand.translations?.[language]?.foundation || brand.foundation?.toString();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-200 pt-24">
      <div className="container mx-auto px-4">
        {/* Encabezado con información ampliada */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{brandName}</h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-6">
            {brandDescription}
          </p>

          {/* Nueva sección de información histórica */}
          <div className="grid md:grid-cols-2 gap-8 bg-zinc-100 dark:bg-zinc-900 p-6 rounded-xl">
            <div>
              {brandFoundation && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-bmw-blue dark:text-bmw-lightblue">
                    {language === "es" ? "Fundación" : "Foundation"}
                  </h3>
                  <p className="text-xl">{brandFoundation}</p>
                </div>
              )}

              {brandHistory && (
                <div>
                  <h3 className="text-lg font-semibold text-bmw-blue dark:text-bmw-lightblue mb-2">
                    {language === "es" ? "Historia" : "History"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {brandHistory}
                  </p>
                </div>
              )}
            </div>

            {brandTrajectory && (
              <div>
                <h3 className="text-lg font-semibold text-bmw-blue dark:text-bmw-lightblue mb-2">
                  {language === "es" ? "Trayectoria" : "Trajectory"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {brandTrajectory}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Lista de vehículos */}
        <h2 className="text-3xl font-bold mb-8">
          {language === "es" ? "Modelos destacados" : "Featured Models"}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brandVehicles.map((vehicle) => {
            const vehicleName =
              vehicle.translations?.[language]?.name || vehicle.name;
            const vehicleDescription =
              vehicle.translations?.[language]?.description ||
              vehicle.description;

            return (
              <Link
                key={vehicle.id}
                to={`/vehicles/${vehicle.id}`}
                className="bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden group transition-shadow hover:shadow-lg"
              >
                <div className="aspect-video">
                  <img
                    src={vehicle.image}
                    alt={vehicleName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{vehicleName}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {vehicleDescription}
                  </p>
                  <p className="text-bmw-blue font-bold">{vehicle.price}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
