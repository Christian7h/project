import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useFavorites } from "../context/useFavorites";
import Fuse from "fuse.js";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Filter,
  Heart,
  Zap,
  Gauge,
  Wind,
  Settings2,
  ChevronDown
} from "lucide-react";
import { brands as brandsData, vehicles as vehiclesData } from "../data";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion, AnimatePresence } from "framer-motion";
import { Vehicle } from "../types";

const VEHICLES_PER_PAGE = 6;

// Formateador de moneda
const formatPrice = (price: string) => {
  const num = parseInt(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(num * 1000); // Asumiendo que el precio en data está en miles o similar
};

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
    onToggleFavorite: (id: string) => void;
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
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:border-bmw-blue/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,76,132,0.1)]"
      >
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(vehicle.id);
          }}
          className={`absolute top-4 right-4 z-10 p-3 rounded-full backdrop-blur-md transition-all duration-300 ${isFavorite
            ? "bg-red-500 text-white"
            : "bg-white/10 text-white hover:bg-white/20"
            }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`} />
        </button>

        <Link to={`/vehicles/${vehicle.id}`} className="block">
          {/* Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <LazyLoadImage
              src={vehicle.image}
              alt={vehicleName}
              effect="blur"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Price Badge */}
            <div className="absolute bottom-4 left-4 bg-bmw-blue text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              {formatPrice(vehicle.price)}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-bmw-blue text-xs font-bold uppercase tracking-widest mb-1">{brandName}</p>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-bmw-blue transition-colors">
                  {vehicleName}
                </h3>
              </div>
              <span className="text-zinc-400 dark:text-zinc-500 text-sm font-medium">{vehicle.year}</span>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-zinc-100 dark:border-zinc-800">
              <div className="flex flex-col items-center">
                <Zap className="w-4 h-4 text-zinc-400 mb-1" />
                <span className="text-[10px] uppercase text-zinc-500 font-bold">{vehicle.specs.power}</span>
              </div>
              <div className="flex flex-col items-center">
                <Gauge className="w-4 h-4 text-zinc-400 mb-1" />
                <span className="text-[10px] uppercase text-zinc-500 font-bold">{vehicle.specs.acceleration}</span>
              </div>
              <div className="flex flex-col items-center">
                <Wind className="w-4 h-4 text-zinc-400 mb-1" />
                <span className="text-[10px] uppercase text-zinc-500 font-bold">{vehicle.specs.topSpeed}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold rounded-lg uppercase tracking-wider">
                {vehicleType}
              </span>
              <div className="flex items-center text-bmw-blue text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {language === 'es' ? 'Ver detalles' : 'View details'} <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }
);

const FilterSection = memo(({
  title,
  value,
  options,
  onChange,
  language,
  icon: Icon
}: {
  title: string;
  value: string;
  options: { value: string, label: string }[];
  onChange: (val: string) => void;
  language: string;
  icon: React.ElementType;
}) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-4 h-4 text-bmw-blue" />
      <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">{title}</h4>
    </div>
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('All')}
        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${value === 'All'
          ? "bg-bmw-blue text-white shadow-lg shadow-bmw-blue/20"
          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          }`}
      >
        {language === 'es' ? 'Todos' : 'All'}
      </button>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${value === opt.value
            ? "bg-bmw-blue text-white shadow-lg shadow-bmw-blue/20"
            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
));

const ListVehicles = () => {
  const { language } = useLanguage();
  const { favorites, toggleFavorite } = useFavorites();
  const [search, setSearch] = useState("");
  const [filterBrand, setFilterBrand] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteMessage, setFavoriteMessage] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(vehiclesData, {
        keys: [
          { name: "name", weight: 0.4, getFn: (v) => v.translations?.[language]?.name || v.name },
          { name: "brandId", weight: 0.3, getFn: (v) => brandsData.find(b => b.id === v.brandId)?.name || "" },
          { name: "type", weight: 0.2, getFn: (v) => v.translations?.[language]?.type || v.type || "" },
        ],
        threshold: 0.3,
      }),
    [language]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterBrand, filterType, filterYear]);

  const { brandOptions, typeOptions, yearOptions } = useMemo(
    () => ({
      brandOptions: brandsData.map((b) => ({
        value: b.id,
        label: b.translations?.[language]?.name || b.name,
      })),
      typeOptions: Array.from(new Set(vehiclesData.map((v) => v.type || ''))).map(t => ({ value: t, label: t })),
      yearOptions: Array.from(new Set(vehiclesData.map((v) => v.year || 0))).sort((a, b) => b - a).map(y => ({ value: y.toString(), label: y.toString() })),
    }),
    [language]
  );

  const filteredVehicles = useMemo(() => {
    let result = [...vehiclesData];
    if (filterBrand !== "All") result = result.filter((v) => v.brandId === filterBrand);
    if (filterType !== "All") result = result.filter((v) => v.type === filterType);
    if (filterYear !== "All") result = result.filter((v) => v.year === parseInt(filterYear));
    if (search) {
      const fuseResults = fuse.search(search);
      result = fuseResults.map((r) => r.item);
    }
    return result;
  }, [search, filterBrand, filterType, filterYear, fuse]);

  const paginatedVehicles = useMemo(() => {
    const start = (currentPage - 1) * VEHICLES_PER_PAGE;
    return filteredVehicles.slice(start, start + VEHICLES_PER_PAGE);
  }, [filteredVehicles, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredVehicles.length / VEHICLES_PER_PAGE));

  const handleToggleFavorite = useCallback(
    (vehicleId: string) => {
      const isAdded = !favorites.includes(vehicleId);
      toggleFavorite(vehicleId);
      setFavoriteMessage(
        isAdded
          ? language === "es" ? "Añadido a Favoritos!" : "Added to Favorites!"
          : language === "es" ? "Eliminado de Favoritos!" : "Removed from Favorites!"
      );
      setTimeout(() => setFavoriteMessage(null), 3000);
    },
    [favorites, language, toggleFavorite]
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-32 pb-24">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-xl">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-4"
            >
              {language === "es" ? "Nuestra Flota" : "Our Fleet"}
            </motion.h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">
              {language === "es"
                ? "Explora nuestra selección curada de los vehículos más exclusivos del mundo."
                : "Explore our curated selection of the world's most exclusive vehicles."}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative" ref={searchRef}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder={language === "es" ? "Buscar..." : "Search..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 pr-6 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full md:w-[300px] focus:ring-2 focus:ring-bmw-blue focus:border-transparent transition-all shadow-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-4 rounded-2xl border transition-all flex items-center gap-2 font-bold ${showFilters
                ? "bg-bmw-blue border-bmw-blue text-white shadow-lg shadow-bmw-blue/20"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                }`}
            >
              <Filter className="w-5 h-5" />
              <span className="hidden md:inline">{language === 'es' ? 'Filtros' : 'Filters'}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, width: 0, x: -50 }}
                animate={{ opacity: 1, width: "auto", x: 0 }}
                exit={{ opacity: 0, width: 0, x: -50 }}
                className="lg:w-80 shrink-0"
              >
                <div className="sticky top-32 p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                      <Settings2 className="w-5 h-5 text-bmw-blue" />
                      {language === 'es' ? 'Refinar' : 'Refine'}
                    </h3>
                    <button onClick={() => {
                      setFilterBrand('All');
                      setFilterType('All');
                      setFilterYear('All');
                    }} className="text-xs font-bold text-bmw-blue hover:underline">
                      {language === 'es' ? 'Limpiar' : 'Clear'}
                    </button>
                  </div>

                  <FilterSection
                    title={language === 'es' ? 'Marca' : 'Brand'}
                    value={filterBrand}
                    options={brandOptions}
                    onChange={setFilterBrand}
                    language={language}
                    icon={ChevronDown}
                  />

                  <FilterSection
                    title={language === 'es' ? 'Categoría' : 'Category'}
                    value={filterType}
                    options={typeOptions}
                    onChange={setFilterType}
                    language={language}
                    icon={ChevronDown}
                  />

                  <FilterSection
                    title={language === 'es' ? 'Año' : 'Year'}
                    value={filterYear}
                    options={yearOptions}
                    onChange={setFilterYear}
                    language={language}
                    icon={ChevronDown}
                  />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <p className="text-zinc-500 font-medium">
                {language === 'es' ? 'Mostrando' : 'Showing'} <span className="text-zinc-900 dark:text-white font-bold">{filteredVehicles.length}</span> {language === 'es' ? 'vehículos' : 'vehicles'}
              </p>
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {paginatedVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    language={language}
                    isFavorite={favorites.includes(vehicle.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredVehicles.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-32 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800"
              >
                <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                  {language === "es" ? "No se encontraron resultados" : "No results found"}
                </h3>
                <p className="text-zinc-500 mb-8 max-w-sm mx-auto">
                  {language === "es"
                    ? "Intenta ajustar tus filtros o buscar términos más generales."
                    : "Try adjusting your filters or searching for more general terms."}
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setFilterBrand("All");
                    setFilterType("All");
                    setFilterYear("All");
                  }}
                  className="bg-bmw-blue text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  {language === "es" ? "Limpiar todos los filtros" : "Clear all filters"}
                </button>
              </motion.div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-16 gap-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 disabled:opacity-50 hover:border-bmw-blue transition-all"
                >
                  <ArrowLeft className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-12 h-12 rounded-2xl font-bold transition-all ${currentPage === p
                        ? "bg-bmw-blue text-white shadow-lg shadow-bmw-blue/20 scale-110"
                        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-bmw-blue"
                        }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 disabled:opacity-50 hover:border-bmw-blue transition-all"
                >
                  <ArrowRight className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pop Notifications */}
      <AnimatePresence>
        {favoriteMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            className={`fixed bottom-12 left-1/2 z-50 px-8 py-4 rounded-2xl shadow-2xl text-white font-bold flex items-center gap-3 ${favoriteMessage.includes("Eliminado") || favoriteMessage.includes("Removed")
              ? "bg-zinc-900 dark:bg-zinc-800"
              : "bg-bmw-blue"
              }`}
          >
            <Heart className={`w-5 h-5 ${!favoriteMessage.includes("Eliminado") ? "fill-white" : ""}`} />
            {favoriteMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ListVehicles;
