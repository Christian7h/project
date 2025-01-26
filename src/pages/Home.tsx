import { useEffect, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { brands, vehicles } from "../data";
import HeroSection from '../components/Hero';
import { useLanguage } from '../context/LanguageContext';
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

// Componente memoizado para números animados
const AnimatedNumber = memo(({ target }: { target: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, target, {
      duration: 2,
      ease: "easeOut"
    });
    return () => animation.stop();
  }, [target, count]);

  return <motion.span aria-live="polite">{rounded}</motion.span>;
});

// Componente memoizado para tarjetas de marca
const BrandCard = memo(({ brand, language }: { brand: any; language: string }) => {
  const translations = useMemo(() => ({
    name: brand.translations?.[language]?.name || brand.name,
    description: brand.translations?.[language]?.description || brand.description
  }), [brand, language]);

  return (
    <Link
      to={`/brands/${brand.id}`}
      className="group bg-gray-100 dark:bg-zinc-900 p-8 rounded-lg text-center transition-transform hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-bmw-blue"
      aria-label={`${translations.name} - ${translations.description}`}
    >
      <img
        src={brand.logo}
        alt={translations.name}
        loading="lazy"
        width={128}
        height={128}
        className="w-32 h-32 mx-auto mb-4 object-contain aspect-square"
        decoding="async"
      />
      <h3 className="text-black dark:text-white text-2xl font-bold mb-2">
        {translations.name}
      </h3>
      <p className="text-gray-900 dark:text-gray-400 text-lg line-clamp-3">
        {translations.description}
      </p>
    </Link>
  );
});

// Componente para columnas de información
const InfoColumn = memo(({ 
  title, 
  description, 
  link, 
  children 
}: {
  title: string;
  description: string;
  link: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
    <Link to={link} className="focus:outline-none focus:ring-2 focus:ring-bmw-blue rounded-lg">
      <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
        {title}
      </h3>
      <p className="text-gray-800 dark:text-gray-400 mb-2">{description}</p>
      <div className="text-3xl font-bold text-bmw-blue dark:text-white">
        {children}
      </div>
    </Link>
  </div>
));

export default function Home() {
  const { language } = useLanguage();
  
  // Memoizar datos calculados
  const [totalVehicles, totalBrands, totalVehiclesAvailable] = useMemo(() => [
    vehicles.length,
    brands.length,
    vehicles.filter((vehicle) => vehicle.stock > 0).length
  ], []);

  // Memoizar traducciones de marcas
  const sortedBrands = useMemo(() => 
    [...brands].sort((a, b) => 
      (a.translations?.[language]?.name || a.name).localeCompare(
        b.translations?.[language]?.name || b.name
      )
    ), [language]
  );

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <HeroSection />
      
      {/* Sección de Marcas Destacadas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-black dark:text-bmw-blue text-4xl font-bold mb-12 text-center">
            {language === 'es' ? 'Marcas Destacadas' : 'Featured Brands'}
          </h1>
          <div className="grid md:grid-cols-3 gap-8">
            {sortedBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} language={language} />
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Estadísticas */}
      <section className="py-20 bg-gray-100 dark:bg-zinc-800">
        <div className="container mx-auto px-4">
          <h2 className="text-black dark:text-bmw-blue text-4xl font-bold mb-12 text-center">
            {language === 'es' ? 'Explora Más' : 'Explore More'}
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-2 gap-4">
            <InfoColumn
              title={language === 'es' ? 'Marcas' : 'Brands'}
              description={language === 'es' 
                ? 'Descubre las marcas más exclusivas.' 
                : 'Discover the most exclusive brands.'}
              link="/brands"
            >
              <AnimatedNumber target={totalBrands} />
            </InfoColumn>

            <InfoColumn
              title={language === 'es' ? 'Vehículos' : 'Vehicles'}
              description={language === 'es'
                ? 'Explora nuestra colección de autos de lujo.'
                : 'Explore our luxury car collection.'}
              link="/ListVehicles"
            >
              <AnimatedNumber target={totalVehicles} />
            </InfoColumn>

            <InfoColumn
              title={language === 'es' ? 'Vehículos Disponibles' : 'Available Vehicles'}
              description={language === 'es'
                ? 'Descubre nuestros autos disponibles.'
                : 'Discover our available cars.'}
              link="/ListVehicles"
            >
              <AnimatedNumber target={totalVehiclesAvailable} />
            </InfoColumn>

            {/* Columnas adicionales... */}
          </div>
        </div>
      </section>
    </main>
  );
}