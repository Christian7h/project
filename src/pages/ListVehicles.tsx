//src/pages/ListVehicles.tsx
import { useState, useEffect, useRef   } from "react";
import { useLanguage } from "../context/LanguageContext";
import { brands as brandsData, vehicles as vehiclesData } from "../data";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/useFavorites";  // Importar el hook
import Fuse from "fuse.js"; // Importar Fuse.js para búsqueda avanzada

interface Vehicle {
  id: number;
  name: string;
  brandId: string; // Relación con las marcas
  type: string; // e.g., "SUV", "Sedan"
  year: number;
  image: string;
  translations?: {
    [key: string]: {
      name: string;
      description: string;
      type: string;
    };
  };
}

export default function ListVehicles() {
  const { language } = useLanguage();
  const [filteredVehicles, setFilteredVehicles] =
    useState<Vehicle[]>(vehiclesData);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filterBrand, setFilterBrand] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [favoriteMessage, setFavoriteMessage] = useState<string | null>(null);  // Estado para el mensaje de favorito

  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 6; // Número de vehículos por página
  const { favorites, toggleFavorite } = useFavorites();  // Usar el hook

  const searchRef = useRef<HTMLDivElement>(null); // Referencia para detectar clics fuera

  const fuse = new Fuse(vehiclesData, {
    keys: ["name", "type", "year", "brandId"],
    threshold: 0.3, // Ajusta la tolerancia de coincidencia
  });

  useEffect(() => {
    let filtered = vehiclesData;
  
    // Filtrar por marca
    if (filterBrand !== "All") {
      filtered = filtered.filter((vehicle) => vehicle.brandId === filterBrand);
    }
  
    // Filtrar por tipo
    if (filterType !== "All") {
      filtered = filtered.filter((vehicle) => vehicle.type === filterType);
    }
    // Filtrar por year
    if (filterYear !== "All") {
      filtered = filtered.filter(
        (vehicle) => vehicle.year === parseInt(filterYear)
      );
    }
    // Filtrar por búsqueda
// Búsqueda avanzada
      // Búsqueda avanzada
      if (search) {
        const results = fuse.search(search);
        filtered = results.map((result) => result.item);
      }
  
      setFilteredVehicles(filtered);
    }, [search, filterBrand, filterType, filterYear]);
  
    // Generar sugerencias en tiempo real
    useEffect(() => {
      if (search) {
        const results = fuse.search(search, { limit: 5 });
        const suggestionList = results.map((result) => result.item.name);
        setSuggestions(suggestionList);
      } else {
        setSuggestions([]);
      }
    }, [search]);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
          setSuggestions([]); // Cierra las sugerencias al hacer clic fuera
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    
    const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setSuggestions([]); // Cierra las sugerencias al presionar Enter
      }
    };
  // Generar listas únicas de marcas y tipos
  const brandOptions = brandsData.map((brand) => ({
    value: brand.id,
    label: brand.translations?.[language]?.name || brand.name,
  }));
  const typeOptions = Array.from(new Set(vehiclesData.map((v) => v.type)));
  const yearOptions = Array.from(new Set(vehiclesData.map((v) => v.year)));

  // Determinar los vehículos a mostrar en la página actual
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = filteredVehicles.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);

  const handleToggleFavorite = (vehicleId: number) => {
    toggleFavorite(vehicleId);
    
    // Verificar si el vehículo está siendo agregado o eliminado de favoritos
    const isAdded = favorites.includes(vehicleId);
    setFavoriteMessage(
      isAdded
        ? language === "es"
          ? "Eliminado de Favoritos!"
          : "Removed from Favorites!"
        : language === "es"
        ? "Añadido a Favoritos!"
        : "Added to Favorites!"
    );

    setTimeout(() => setFavoriteMessage(null),4000);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black pt-24 py-4">
      <h1 className="text-3xl font-bold text-black dark:text-white text-center mb-8">
        {language === "es" ? "Lista de Vehículos" : "Vehicle List"}
      </h1>

      {/* Filtros y Búsqueda */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4 mx-8">
          {/* Input de Búsqueda */}
           {/* Input de búsqueda */}
          <div className="relative flex-1" ref={searchRef}>
            <input
              type="text"
              placeholder={
                language === "es" ? "Buscar vehículos..." : "Search vehicles..."
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full p-3 border rounded-md dark:bg-gray-900 dark:text-white"
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 dark:text-white border rounded-md shadow-md z-10 mt-1">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSearch(suggestion);
                      setSuggestions([]); // Cierra las sugerencias al seleccionar
                    }}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

      
          {/* Filtro por Marca */}
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="p-3 border rounded-md dark:bg-gray-900 dark:text-white"
          >
            <option value="All">
              {language === "es" ? "Marcas" : "All Brands"}
            </option>
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
            <option value="All">
              {language === "es" ? "Tipos" : "All Types"}
            </option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {/* Filtro por Year */}

          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="p-3 border rounded-md dark:bg-gray-900 dark:text-white"
          >
            <option value="All">
              {language === "es" ? "Años" : "All years"}
            </option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
 {/* Mensaje de añadido o eliminado de favoritos */}
      {favoriteMessage && (
        <div
          className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-lg ${
            favoriteMessage.includes("Eliminado")
              ? "bg-red-500"
              : "bg-green-500"
          }`}
        >
          {favoriteMessage}
        </div>
      )}
      {/* Lista de Vehículos */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {currentVehicles.map((vehicle) => {
          const vehicleName =
            vehicle.translations?.[language]?.name || vehicle.name;
          const vehicleType =
            vehicle.translations?.[language]?.type || vehicle.type;
            const isFavorite = favorites.includes(vehicle.id);
            return (

              <div
                key={vehicle.id}
                className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                            <Link
              key={vehicle.id}
              to={`/vehicles/${vehicle.id}`}
              className="bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden group transition-shadow  hover:shadow-lg"
            >
                <div className="">
                  <img
                    src={vehicle.image}
                    alt={vehicleName}
                    loading="lazy"
                    className="w-full h-48 object-cover rounded-md mb-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                  {vehicleName}
                </h3>
                <p className="text-gray-700 dark:text-gray-400 mb-2">
                  {language === "es" ? "Marca" : "Brand"}:{" "}
                  {brandsData.find((b) => b.id === vehicle.brandId)
                    ?.translations?.[language]?.name ||
                    brandsData.find((b) => b.id === vehicle.brandId)?.name}
                </p>
                <p className="text-gray-700 dark:text-gray-400 mb-2">
                  {language === "es" ? "Tipo" : "Type"}: {vehicleType}
                </p>
                <p className="text-gray-700 dark:text-gray-400">
                  {language === "es" ? "Año" : "Year"}: {vehicle.year}
                </p>
            </Link>

            <button
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleFavorite(vehicle.id); // Cambiar el estado de favorito
                }}
                className={`rounded-full ${isFavorite ? "text-red-500" : "text-gray-400"}`}
              >
                ♥
              </button>
              </div>
          );
        })}
      </div>
      {/* Paginación */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-bmw-blue text-white rounded-md mr-2 disabled:bg-gray-400"
        >
          {language === "es" ? "Anterior" : "Previous"}
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-bmw-blue text-white rounded-md disabled:bg-gray-400"
        >
          {language === "es" ? "Siguiente" : "Next"}
        </button>
      </div>
      {filteredVehicles.length === 0 && (
        <div className="text-center text-gray-700 dark:text-gray-400 mt-8">
          {language === "es"
            ? "No se encontraron vehículos con los filtros seleccionados."
            : "No vehicles found with the selected filters."}
        </div>
      )}
    </div>
  );
}
