import { useEffect, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { brands, vehicles } from "../data";
import HeroSection from "../components/Hero";
import VehicleConfigurator from "../components/VehicleConfigurator";
import { useLanguage } from "../context/LanguageContext";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

// Componente memoizado para números animados
const AnimatedNumber = memo(({ target }: { target: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, target, {
      duration: 8,
      ease: "easeOut",
    });
    return () => animation.stop();
  }, [target, count]);

  return <motion.span aria-live="polite">{rounded}</motion.span>;
});

// Componente memoizado para tarjetas de marca mejoradas
const BrandCard = memo(
  ({
    brand,
    language,
  }: {
    brand: {
      id: string;
      logo: string;
      name: string;
      description: string;
      translations?: Record<string, { name: string; description: string }>;
    };
    language: string;
  }) => {
    const translations = useMemo(
      () => ({
        name: brand.translations?.[language]?.name || brand.name,
        description:
          brand.translations?.[language]?.description || brand.description,
      }),
      [brand, language]
    );

    return (
      <Link
        to={`/brands/${brand.id}`}
        className="group relative bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 p-8 rounded-xl text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-bmw-blue border border-zinc-200 dark:border-zinc-700 hover:border-bmw-blue/30 dark:hover:border-bmw-lightblue/30"
        aria-label={`${translations.name} - ${translations.description}`}
      >
        {/* Barra superior animada */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bmw-blue to-bmw-lightblue rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

        {/* Contenedor del logo con efecto glassmorphismo */}
        <div className="relative mb-6">
          <div className="w-32 h-32 mx-auto bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-4 flex items-center justify-center border border-white/20 dark:border-white/10 group-hover:bg-white/20 dark:group-hover:bg-white/10 transition-all duration-300">
            <img
              src={brand.logo}
              alt={translations.name}
              loading="lazy"
              width={96}
              height={96}
              className="w-24 h-24 transition-all duration-300 group-hover:scale-110 object-contain aspect-square filter group-hover:brightness-110"
              decoding="async"
            />
          </div>
          {/* Efectos de luz decorativos */}
          <div className="absolute -inset-2 bg-gradient-to-r from-bmw-blue/10 to-bmw-lightblue/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <h3 className="text-gray-900 dark:text-white text-2xl font-bold mb-3 group-hover:text-bmw-blue dark:group-hover:text-bmw-lightblue transition-colors duration-300">
          {translations.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
          {translations.description}
        </p>

        {/* Icono de flecha */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <div className="w-8 h-8 bg-bmw-blue rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>
    );
  }
);

// Componente para el enlace "Ver todas las marcas"
const ViewAllBrandsCard = memo(({ language }: { language: string }) => (
  <Link
    to="/brands"
    className="group bg-bmw-blue dark:bg-bmw-blue/90 p-8 rounded-lg text-center transition-transform hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-bmw-blue"
  >
    <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
      <svg
        className="w-16 h-16 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </div>
    <h3 className="text-white text-2xl font-bold mb-2">
      {language === "es" ? "Descubre más marcas" : "Discover more brands"}
    </h3>
    <p className="text-white/90 text-lg">
      {language === "es"
        ? "Explora nuestra colección completa de marcas premium"
        : "Explore our complete collection of premium brands"}
    </p>
  </Link>
));

// Componente para columnas de información
const InfoColumn = memo(
  ({
    title,
    description,
    link,
    children,
  }: {
    title: string;
    description: string;
    link: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
      <Link
        to={link}
        className="focus:outline-none focus:ring-2 focus:ring-bmw-blue rounded-lg"
      >
        <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
          {title}
        </h3>
        <p className="text-gray-800 dark:text-gray-400 mb-2">{description}</p>
        <div className="text-3xl font-bold text-bmw-blue dark:text-white">
          {children}
        </div>
      </Link>
    </div>
  )
);

// Nuevo componente para el Configurador Rápido - Movido a VehicleConfigurator.tsx

export default function Home() {
  const { language } = useLanguage();

  // Memoizar datos calculados
  const [totalVehicles, totalBrands] = useMemo(
    () => [vehicles.length, brands.length],
    []
  );

  // En el componente principal, mostrar solo 3 marcas + el enlace
  const featuredBrands = useMemo(() => {
    // Seleccionar las primeras 3 marcas
    return brands.slice(0, 7);
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <HeroSection />

      {/* Sección de Marcas Destacadas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-black dark:text-bmw-blue text-4xl font-bold mb-12 text-center">
            {language === "es" ? "Marcas Destacadas" : "Featured Brands"}
          </h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} language={language} />
            ))}
            <ViewAllBrandsCard language={language} />
          </div>
        </div>
      </section>

      <VehicleConfigurator />

      {/* Sección de Estadísticas */}
      <section className="py-20 bg-gray-100 dark:bg-zinc-800">
        <div className="container mx-auto px-4">
          <h2 className="text-black dark:text-bmw-blue text-4xl font-bold mb-12 text-center">
            {language === "es" ? "Explora Más" : "Explore More"}
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-2 gap-4">
            <InfoColumn
              title={language === "es" ? "Marcas" : "Brands"}
              description={
                language === "es"
                  ? "Descubre las marcas más exclusivas."
                  : "Discover the most exclusive brands."
              }
              link="/brands"
            >
              <AnimatedNumber target={totalBrands} />
            </InfoColumn>

            <InfoColumn
              title={
                language === "es"
                  ? "Vehículos Disponibles"
                  : "Available Vehicles"
              }
              description={
                language === "es"
                  ? "Descubre nuestros autos disponibles."
                  : "Discover our available cars."
              }
              link="/ListVehicles"
            >
              <AnimatedNumber target={totalVehicles} />
            </InfoColumn>

            {/* Columnas adicionales... */}
          </div>
        </div>
        {/* <iframe width="576" height="324" src="https://sexyfilter.com/embed/37350" frameborder="0" allowfullscreen></iframe> */}
      </section>
    </main>
  );
}
