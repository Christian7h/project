import { useFavorites } from "../context/useFavorites";
import { vehicles as vehiclesData } from "../data";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const favoriteVehicles = vehiclesData.filter((v) => favorites.includes(v.id));

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black pt-24 py-4">
      <h1 className="text-3xl font-bold text-black dark:text-white text-center mb-8">
        Favoritos
      </h1>

      {favoriteVehicles.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-400">
          No tienes vehículos en favoritos.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {favoriteVehicles.map((vehicle) => (
            <Link
              key={vehicle.id}
              to={`/vehicles/${vehicle.id}`}
              className="bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden group transition-shadow  hover:shadow-lg"
            >
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                {vehicle.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-400">
                {vehicle.year}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
