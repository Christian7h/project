import { useState } from "react";
import { useFavorites } from "../context/useFavorites";
import { vehicles as vehiclesData } from "../data";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const favoriteVehicles = vehiclesData.filter((v) => favorites.includes(v.id));

  // Estados para los filtros
  const [filterBrand, setFilterBrand] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterYear, setFilterYear] = useState("All");

  // Filtrar vehículos favoritos según los filtros
  let filteredFavorites = favoriteVehicles;

  // Filtrar por marca
  if (filterBrand !== "All") {
    filteredFavorites = filteredFavorites.filter(
      (vehicle) => vehicle.brandId === filterBrand
    );
  }

  // Filtrar por tipo
  if (filterType !== "All") {
    filteredFavorites = filteredFavorites.filter(
      (vehicle) => vehicle.type === filterType
    );
  }

  // Filtrar por año
  if (filterYear !== "All") {
    filteredFavorites = filteredFavorites.filter(
      (vehicle) => vehicle.year === parseInt(filterYear)
    );
  }

  // Generar listas únicas de marcas, tipos y años para los filtros
  const brandOptions = Array.from(
    new Set(vehiclesData.map((v) => v.brandId))
  ).map((brandId) => ({
    value: brandId,
    label: vehiclesData.find((v) => v.brandId === brandId)?.brandId,
  }));

  const typeOptions = Array.from(new Set(vehiclesData.map((v) => v.type)));
  const yearOptions = Array.from(new Set(vehiclesData.map((v) => v.year)));

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black pt-24 py-4">
      <h1 className="text-3xl font-bold text-black dark:text-white text-center mb-8">
        Favoritos
      </h1>

      {/* Filtros */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4 mx-8">
          {/* Filtro por Marca */}
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="p-3 border rounded-md dark:bg-gray-900 dark:text-white"
          >
            <option value="All">All Brands</option>
            {brandOptions.map((brand) => (
              <option key={brand.value} value={brand.value}>
                {brand.label}
              </option>
            ))}
          </select>

          {/* Filtro por Tipo */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-3 border rounded-md dark:bg-gray-900 dark:text-white"
          >
            <option value="All">All Types</option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Filtro por Año */}
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="p-3 border rounded-md dark:bg-gray-900 dark:text-white"
          >
            <option value="All">All Years</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mostrar vehículos favoritos filtrados */}
      {filteredFavorites.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-400">
          No tienes vehículos en favoritos.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredFavorites.map((vehicle) => (
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
