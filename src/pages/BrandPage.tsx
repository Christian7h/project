import { useParams, Link } from 'react-router-dom';
import { brands, vehicles } from '../data';
import LoadingSpinner from '../components/LoadingSpinner';
import { useLanguage } from '../context/LanguageContext'; // Asegúrate de que este hook esté configurado correctamente

export default function BrandPage() {
  const { brandId } = useParams<{ brandId: string }>();
  const { language } = useLanguage();  // Obtén el idioma actual

  // Encuentra la marca seleccionada
  const brand = brands.find(b => b.id === brandId);
  if (!brand) {
    return <LoadingSpinner />;
  }

  // Filtra los vehículos que pertenecen a esta marca
  const brandVehicles = vehicles.filter(v => v.brandId === brandId);

  // Obtener las traducciones según el idioma
  const brandName = brand.translations?.[language]?.name || brand.name;
  const brandDescription = brand.translations?.[language]?.description || brand.description;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-200 pt-24">
      <div className="container mx-auto px-4">
        {/* Título de la marca */}
        <h1 className="text-4xl font-bold mb-8">{brandName}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
          {brandDescription}
        </p>

        {/* Lista de vehículos de la marca */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brandVehicles.map((vehicle) => {
            // Obtener las traducciones de cada vehículo según el idioma
            const vehicleName = vehicle.translations?.[language]?.name || vehicle.name;
            const vehicleDescription = vehicle.translations?.[language]?.description || vehicle.description;

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
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
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
