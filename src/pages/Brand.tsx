import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { brands, vehicles } from "../data";

// Componente memoizado para tarjetas de marca
const BrandCard = ({ brand, language }: { brand: any; language: string }) => {
  const [brandName, brandDescription] = useMemo(
    () => [
      brand.translations?.[language]?.name || brand.name,
      brand.translations?.[language]?.description || brand.description,
    ],
    [brand, language]
  );

  // Memoiza el conteo de vehículos
  const vehiclesCount = useMemo(
    () => vehicles.filter((v) => v.brandId === brand.id).length,
    [brand, language]
  );

  return (
    <Link
      to={`/brands/${brand.id}`}
      className="group relative bg-zinc-100 dark:bg-zinc-900 p-8 rounded-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-bmw-blue dark:focus:ring-bmw-blue"
      aria-label={`${brandName} - ${brandDescription}`}
    >
      <div className="relative">
        <img
          src={brand.logo}
          alt={brandName}
          loading="lazy"
          width={128}
          height={128}
          className="w-full h-full mx-auto mb-4 transition-all duration-300 hover:scale-[1.05] object-contain aspect-square"
          decoding="async"
        />
      </div>
        <h3 className="text-2xl font-bold mb-2 text-center animate-slide-up">{brandName}</h3>
        <p className="text-gray-600 dark:text-gray-400 line-clamp-3 text-center animate-fade-in">
          {brandDescription}
        </p>
        <span className="text-bmw-blue font-bold text-center animate-pulse">
          {language === "es" ? "Vehículos disponibles" : "Available vehicles"}
          <br />
          {vehiclesCount}
        </span>
    </Link>
  );
};

export default function Brand() {
  const { language } = useLanguage();

  // Memoiza la lista ordenada de marcas
  const sortedBrands = useMemo(
    () =>
      [...brands].sort((a, b) =>
        a.translations?.[language]?.name.localeCompare(
          b.translations?.[language]?.name
        )
      ),
    [brands, language]
  );

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-200 pt-20">
      <section className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center animate-fade-in">
          {language === "es" ? "Marcas Destacadas" : "Featured Brands"}
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full mx-auto">
          {sortedBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} language={language} />
          ))}
        </div>
      </section>
    </main>
  );
}
