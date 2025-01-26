import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useFavorites } from "../context/useFavorites";
import Fuse from "fuse.js";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { brands as brandsData, vehicles as vehiclesData } from "../data";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Vehicle {
  id: number;
  name: string;
  brandId: string;
  type: string;
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

const VEHICLES_PER_PAGE = 6;

const VehicleCard = memo(
  ({
    vehicle,
    language,
    isFavorite,
    onToggleFavorite,
  }: {
    vehicle: Vehicle;
    language: string;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
  }) => {
    const vehicleName = vehicle.translations?.[language]?.name || vehicle.name;
    const vehicleType = vehicle.translations?.[language]?.type || vehicle.type;

    const brandName = useMemo(
      () =>
        brandsData.find((b) => b.id === vehicle.brandId)?.translations?.[
          language
        ]?.name || brandsData.find((b) => b.id === vehicle.brandId)?.name,
      [vehicle.brandId, language]
    );

    return (
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300">
        <Link
          to={`/vehicles/${vehicle.id}`}
          aria-label={`${vehicleName} details`}
          className="bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden group transition-shadow  hover:shadow-lg"
        >
          <LazyLoadImage
            src={vehicle.image}
            alt={vehicleName}
            effect="opacity"
            width="100%"
            className="h-48 object-cover rounded-md mb-4 group-hover:scale-105 transition-transform duration-500"
            placeholderSrc="/placeholder-car.jpg"
          />
          <h3 className="text-xl font-bold text-black dark:text-white mb-2">
            {vehicleName}
          </h3>
          <div className="space-y-1">
            <p className="text-gray-700 dark:text-gray-400">
              {language === "es" ? "Marca" : "Brand"}: {brandName}
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              {language === "es" ? "Tipo" : "Type"}: {vehicleType}
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              {language === "es" ? "Año" : "Year"}: {vehicle.year}
            </p>
          </div>
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(vehicle.id);
          }}
          className={`mt-2 text-xl ${
            isFavorite
              ? "text-red-500 animate-heartbeat"
              : "text-gray-400 hover:text-red-400"
          } transition-colors duration-200`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          ♥
        </button>
      </div>
    );
  }
);

const ListVehicles = () => {
  const { language } = useLanguage();
  const { favorites, toggleFavorite } = useFavorites();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [filterBrand, setFilterBrand] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteMessage, setFavoriteMessage] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Configuración de Fuse.js memoizada
  const fuse = useMemo(
    () =>
      new Fuse(vehiclesData, {
        keys: [
          {
            name: "name",
            weight: 0.4,
            getFn: (vehicle) =>
              vehicle.translations?.[language]?.name || vehicle.name || "",
          },
          {
            name: "brandId",
            weight: 0.3,
            getFn: (vehicle) => {
              const brand = brandsData.find((b) => b.id === vehicle.brandId);
              return brand?.translations?.[language]?.name || brand?.name || "";
            },
          },
          {
            name: "type",
            weight: 0.2,
            getFn: (vehicle) =>
              vehicle.translations?.[language]?.type || vehicle.type || "",
          },
          {
            name: "year",
            weight: 0.1,
          },
        ],
        threshold: 0.3,
        minMatchCharLength: 2,
        includeMatches: true,
        useExtendedSearch: true,
      }),
    [language]
  );

  useEffect(() => {
    // Resetear a página 1 cuando cambien los filtros o la búsqueda
    setCurrentPage(1);
  }, [search, filterBrand, filterType, filterYear]);

  useEffect(() => {
    if (search.length >= 2) {
      const fuseResults = fuse.search(search);
      const uniqueSuggestions = Array.from(
        new Set(
          fuseResults
            .slice(0, 5) // Limitar a 5 sugerencias
            .map((result) => {
              const item = result.item;
              // Buscar coincidencias en las traducciones
              const translationMatch = item.translations?.[language]?.name;
              // Buscar en todos los campos posibles
              return translationMatch || item.name;
            })
        )
      );
      setSuggestions(uniqueSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [search, fuse, language]);

  // Opciones de filtro memoizadas
  const { brandOptions, typeOptions, yearOptions } = useMemo(
    () => ({
      brandOptions: brandsData.map((brand) => ({
        value: brand.id,
        label: brand.translations?.[language]?.name || brand.name,
      })),
      typeOptions: Array.from(new Set(vehiclesData.map((v) => v.type))),
      yearOptions: Array.from(new Set(vehiclesData.map((v) => v.year))),
    }),
    [language]
  );
  const generatePageRange = (currentPage: number, totalPages: number) => {
    if (totalPages <= 1) return [];
    
    const pages: (number | string)[] = [];
    
    // Siempre mostrar primera página
    pages.push(1);
    
    // Mostrar página actual si no es la primera
    if (currentPage !== 1 && currentPage !== totalPages) {
      pages.push(currentPage);
    }
    
    // Mostrar puntos suspensivos si hay espacio entre páginas
    if (currentPage > 2 && totalPages > 3) {
      pages.splice(1, 0, '...');
    }
    
    // Siempre mostrar última página
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages.filter((item, index, self) => 
      item !== '...' || self[index - 1] !== '...'
    );
  };
  // 4. Mejorar el sistema de filtrado
  const filteredVehicles = useMemo(() => {
    let result = vehiclesData;

    // Aplicar filtros
    if (filterBrand !== "All")
      result = result.filter((v) => v.brandId === filterBrand);
    if (filterType !== "All")
      result = result.filter((v) => v.type === filterType);
    if (filterYear !== "All")
      result = result.filter((v) => v.year === parseInt(filterYear));

    // Aplicar búsqueda con Fuse.js
    if (search) {
      const fuseResults = fuse.search(search);
      result = fuseResults.map((r) => r.item);
    }

    return result;
  }, [search, filterBrand, filterType, filterYear, fuse]);

  // Paginación
  const paginatedVehicles = useMemo(() => {
    const start = (currentPage - 1) * VEHICLES_PER_PAGE;
    return filteredVehicles.slice(start, start + VEHICLES_PER_PAGE);
  }, [filteredVehicles, currentPage]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredVehicles.length / VEHICLES_PER_PAGE)),
    [filteredVehicles]
  );

  // Manejar favoritos
  const handleToggleFavorite = useCallback(
    (vehicleId: number) => {
      const isAdded = !favorites.includes(vehicleId);
      toggleFavorite(vehicleId);

      setFavoriteMessage(
        isAdded
          ? language === "es"
            ? "Añadido a Favoritos!"
            : "Added to Favorites!"
          : language === "es"
          ? "Eliminado de Favoritos!"
          : "Removed from Favorites!"
      );

      setTimeout(() => setFavoriteMessage(null), 3000);
    },
    [favorites, language, toggleFavorite]
  );

  // Manejar clic fuera del área de búsqueda
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Manejar teclado en búsqueda
  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setSuggestions([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black pt-24 py-4">
      <h1 className="text-3xl font-bold text-black dark:text-white text-center mb-8">
        {language === "es" ? "Lista de Vehículos" : "Vehicle List"}
      </h1>

      {/* Filtros y Búsqueda */}
      <div className="max-w-5xl mx-auto mb-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Búsqueda */}
          <div className="relative md:col-span-2" ref={searchRef}>
            <input
              type="text"
              placeholder={
                language === "es" ? "Buscar vehículos..." : "Search vehicles..."
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full p-3 border rounded-md dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-bmw-blue"
              aria-label={
                language === "es" ? "Buscar vehículos" : "Search vehicles"
              }
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border rounded-md shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={`${suggestion}-${index}`}
                    onClick={() => {
                      setSearch(suggestion);
                      setSuggestions([]);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors text-black dark:text-white"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Selectores de Filtro */}
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="p-3 border rounded-md dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-bmw-blue"
            aria-label={
              language === "es" ? "Filtrar por marca" : "Filter by brand"
            }
          >
            <option value="All">
              {language === "es" ? "Todas las marcas" : "All Brands"}
            </option>
            {brandOptions.map((brand) => (
              <option key={brand.value} value={brand.value}>
                {brand.label}
              </option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-3 border rounded-md dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-bmw-blue"
            aria-label={
              language === "es" ? "Filtrar por tipo" : "Filter by type"
            }
          >
            <option value="All">
              {language === "es" ? "Todos los tipos" : "All Types"}
            </option>
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="p-3 border rounded-md dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-bmw-blue"
            aria-label={
              language === "es" ? "Filtrar por año" : "Filter by year"
            }
          >
            <option value="All">
              {language === "es" ? "Todos los años" : "All Years"}
            </option>
            {yearOptions.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notificación de Favoritos */}
      {favoriteMessage && (
        <div
          className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-lg text-white ${
            favoriteMessage.includes("Eliminado")
              ? "bg-red-500"
              : "bg-green-500"
          } animate-fade-in-up`}
        >
          {favoriteMessage}
        </div>
      )}

      {/* Lista de Vehículos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {paginatedVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            language={language}
            isFavorite={favorites.includes(vehicle.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-8 gap-1 sm:gap-2">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
    disabled={currentPage === 1}
    className="p-2 sm:px-4 sm:py-2 rounded-md bg-bmw-blue text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
  >
    <ArrowLeft className="w-4 h-4" />
  </button>

  {generatePageRange(currentPage, totalPages).map((page, index) => {
    if (page === '...') {
      return (
        <span
          key={`ellipsis-${index}`}
          className="px-2 py-1 text-gray-500 dark:text-gray-400"
        >
          ...
        </span>
      );
    }
    
    return (
      <button
        key={page}
        onClick={() => setCurrentPage(Number(page))}
        className={`px-2 py-1 sm:px-3 sm:py-1 rounded-md min-w-[32px] sm:min-w-[40px] text-sm ${
          currentPage === page
            ? "bg-bmw-blue text-white"
            : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        } transition-colors`}
      >
        {page}
      </button>
    );
  })}

  <button
    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
    disabled={currentPage === totalPages}
    className="p-2 sm:px-4 sm:py-2 rounded-md bg-bmw-blue text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
  >
    <ArrowRight className="h-4 w-4" />
  </button>
</div>

      {/* Mensaje sin resultados */}
      {filteredVehicles.length === 0 && (
        <div className="text-center text-gray-700 dark:text-gray-400 mt-8 px-4">
          <p className="text-xl mb-4">
            {language === "es"
              ? "No encontramos vehículos con esos filtros"
              : "No vehicles found with these filters"}
          </p>
          <button
            onClick={() => {
              setSearch("");
              setFilterBrand("All");
              setFilterType("All");
              setFilterYear("All");
            }}
            className="bg-bmw-blue text-white px-6 py-2 rounded-md hover:bg-bmw-blue/90 transition-colors"
          >
            {language === "es" ? "Limpiar filtros" : "Clear filters"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ListVehicles;
