import { useEffect } from "react";
import { Link } from "react-router-dom";
import { brands, vehicles } from "../data";
import HeroSection from '../components/Hero.tsx'
import { useLanguage } from '../context/LanguageContext.jsx';
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function Home() {
  const { language } = useLanguage(); // Obtener el idioma desde el contexto
  // Número total de vehículos y marcas
  const totalVehicles = vehicles.length; // Ajusta según tu data real
  const totalBrands = brands.length;
  // Función para animar números
  const AnimatedNumber = ({ target, start }: { target: number; start: boolean }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);
  
    useEffect(() => {
      if (start) {
        const animation = animate(count, target, {
          duration: 5,
          ease: "easeOut",
        });
        return animation.stop;
      }
    }, [start, count, target]);
  
    return <motion.span>{rounded}</motion.span>;
  };
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Featured Brands Section */}
      <HeroSection/>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-black dark:text-bmw-blue text-4xl font-bold mb-12 text-center">
            {language === 'es' ? 'Marcas Destacadas' : 'Featured Brands'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {brands.map((brand) => {
              // Acceder a las traducciones según el idioma
              const brandName = brand.translations?.[language]?.name || brand.name;
              const brandDescription = brand.translations?.[language]?.description || brand.description;

              return (
                <Link
                  key={brand.id}
                  to={`/brands/${brand.id}`}
                  className="group bg-slate-200 dark:bg-zinc-900 p-8 rounded-lg text-center transition-transform hover:-translate-y-2"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-32 h-32 mx-auto mb-4 object-contain"
                  />
                  <h3 className="text-black dark:text-white text-2xl font-bold mb-2">{brandName}</h3>
                  <p className="text-gray-900 dark:text-gray-400 text-lg">{brandDescription}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
     {/* New Section: Info Columns */}
     <section className="py-20 bg-gray-100 dark:bg-zinc-800">
  <div className="container mx-auto px-4">
    <h2 className="text-black dark:text-bmw-blue text-4xl font-bold mb-12 text-center">
      {language === 'es' ? 'Explora Más' : 'Explore More'}
    </h2>
    <div className="grid grid-cols-3 gap-8">
      {/* Column 1 */}
      <motion.div
        className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md text-center"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
          {language === 'es' ? 'Marcas' : 'Brands'}
        </h3>
        <p className="text-gray-800 dark:text-gray-400">
          {language === 'es'
            ? 'Descubre las marcas más exclusivas.'
            : 'Discover the most exclusive brands.'}
        </p>
      </motion.div>

      {/* Column 2 */}
      <motion.div
        className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
          {language === 'es' ? 'Vehículos' : 'Vehicles'}
        </h3>
        <p className="text-gray-800 dark:text-gray-400">
          {language === 'es'
            ? 'Explora nuestra colección de autos de lujo.'
            : 'Explore our luxury car collection.'}
        </p>
      </motion.div>

      {/* Column 3 */}
      <motion.div
        className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md text-center"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
          {language === 'es' ? 'Características' : 'Features'}
        </h3>
        <p className="text-gray-800 dark:text-gray-400">
          {language === 'es'
            ? 'Descubre lo que hace especial a Luxury Motors.'
            : 'Discover what makes Luxury Motors special.'}
        </p>
      </motion.div>
{/* Column 4: Total Brands */}
<motion.div
        className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md text-center col-span-3"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} // Ejecuta la animación una sola vez
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
          {language === 'es' ? 'Marcas Totales' : 'Total Brands'}
        </h3>
        <p className="text-3xl font-bold text-bmw-blue dark:text-white">
          <AnimatedNumber target={totalBrands} start={true} />
        </p>
      </motion.div>
      {/* Column 5: Total Vehicles */}
      <motion.div
        className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md text-center col-span-3"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} // Ejecuta la animación una sola vez
        transition={{ duration: 0.5, delay: 0.6 }}
      >
      <Link to="ListVehicles">

        <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
          {language === 'es' ? 'Vehículos Totales' : 'Total Vehicles'}
        </h3>
        <p className="text-3xl font-bold text-bmw-blue dark:text-white">
          <AnimatedNumber target={totalVehicles} start={true} />
        </p>
      </Link>
      </motion.div>
      
    </div>
  </div>
</section>
    </div>
  );
}
