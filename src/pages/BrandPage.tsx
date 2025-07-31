import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { brands, vehicles } from "../data";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLanguage } from "../context/LanguageContext";

function BrandInfo({ brand, language }) {
  const { logo, name, description, history, trajectory, foundation } =
    brand.translations?.[language] || brand;

  return (
    <div className="mb-16">
      {/* Hero Section con fondo gradiente y logo centrado */}
      <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8 shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Patrón de fondo decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-10 right-1/3 w-20 h-20 border border-white/20 rounded-full"></div>
        </div>
        
        {/* Logo centrado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <img
                  src={brand.logo}
                  alt={name}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain"
                  loading="lazy"
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
              {name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed drop-shadow-lg">
              {description}
            </p>
          </div>
        </div>
        
        {/* Elementos decorativos en las esquinas */}
        
        {/* Efectos de luz */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Cards de información */}
      <div className="grid lg:grid-cols-3 gap-6">
        {foundation && (
          <div className="group relative bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200 dark:border-zinc-700 hover:border-bmw-blue/30 dark:hover:border-bmw-lightblue/30">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bmw-blue to-bmw-lightblue rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-bmw-blue/10 dark:bg-bmw-lightblue/10 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-bmw-blue dark:text-bmw-lightblue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-bmw-blue dark:text-bmw-lightblue">
                {language === "es" ? "Fundación" : "Foundation"}
              </h3>
            </div>
            <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{foundation}</p>
          </div>
        )}

        {history && (
          <div className="group relative bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200 dark:border-zinc-700 hover:border-bmw-blue/30 dark:hover:border-bmw-lightblue/30">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bmw-blue to-bmw-lightblue rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-bmw-blue/10 dark:bg-bmw-lightblue/10 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-bmw-blue dark:text-bmw-lightblue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-bmw-blue dark:text-bmw-lightblue">
                {language === "es" ? "Historia" : "History"}
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
              {history}
            </p>
          </div>
        )}

        {trajectory && (
          <div className="group relative bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-200 dark:border-zinc-700 hover:border-bmw-blue/30 dark:hover:border-bmw-lightblue/30">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bmw-blue to-bmw-lightblue rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-bmw-blue/10 dark:bg-bmw-lightblue/10 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-bmw-blue dark:text-bmw-lightblue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-bmw-blue dark:text-bmw-lightblue">
                {language === "es" ? "Trayectoria" : "Trajectory"}
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
              {trajectory}
            </p>
          </div>
        )}
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
        const { name, description } =
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
