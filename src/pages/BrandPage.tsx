import { useParams, Link } from 'react-router-dom';
import { brands, vehicles } from '../data';
import LoadingSpinner from '../components/LoadingSpinner';

export default function BrandPage() {
  const { brandId } = useParams<{ brandId: string }>();
  const brand = brands.find(b => b.id === brandId);
  const brandVehicles = vehicles.filter(v => v.brandId === brandId);

  if (!brand) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-200 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{brand.name}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
          {brand.description}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brandVehicles.map((vehicle) => (
            <Link
              key={vehicle.id}
              to={`/vehicles/${vehicle.id}`}
              className="bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden group transition-shadow hover:shadow-lg"
            >
              <div className="aspect-video">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{vehicle.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {vehicle.description}
                </p>
                <p className="text-bmw-blue font-bold">{vehicle.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
