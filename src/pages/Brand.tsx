import { brands } from "../data";
import { Link } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext.jsx";

export default function Brand() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-200 pt-24">
      <div className="container mx-auto px-4">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">
              {language === "es" ? "Marcas Destacadas" : "Featured Brands"}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {brands.map((brand) => {
                const brandName =
                  brand.translations?.[language]?.name || brand.name;
                const brandDescription =
                  brand.translations?.[language]?.description ||
                  brand.description;
                return (
                  <Link
                    key={brand.id}
                    to={`/brands/${brand.id}`}
                    className="group bg-zinc-100 dark:bg-zinc-900 p-8 rounded-lg text-center transition-transform hover:-translate-y-2 hover:shadow-lg"
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      loading="lazy"
                      className="w-32 h-32 mx-auto mb-4 object-contain"
                    />
                    <h3 className="text-2xl font-bold mb-2">{brandName}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {brandDescription}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
