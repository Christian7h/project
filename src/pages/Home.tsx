import { Link } from "react-router-dom";
import { brands } from "../data";
import HeroSection from '../components/Hero.tsx'
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Home() {
  const { language } = useLanguage(); // Obtener el idioma desde el contexto

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
    </div>
  );
}
