import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { brands, vehicles } from "../data";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Award, Trophy } from "lucide-react";
import { Brand as BrandType } from "../types";

// Componente para tarjetas de marca con diseño premium
const BrandCard = ({ brand, language, index }: { brand: BrandType; language: string; index: number }) => {
  const brandName = brand.translations?.[language]?.name || brand.name;
  const brandDescription = brand.translations?.[language]?.description || brand.description;
  const vehiclesCount = vehicles.filter((v) => v.brandId === brand.id).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/brands/${brand.id}`}
        className="group relative block bg-white dark:bg-zinc-900 rounded-[2rem] p-10 border border-zinc-100 dark:border-zinc-800 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_30px_60px_-15px_rgba(0,76,132,0.1)] hover:-translate-y-2"
      >
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
          <ArrowRight className="w-6 h-6 text-bmw-blue" />
        </div>

        {/* Logo Container */}
        <div className="relative mb-8 flex justify-center">
          <div className="w-32 h-32 flex items-center justify-center bg-zinc-50 dark:bg-zinc-800/50 rounded-[1.5rem] group-hover:scale-110 transition-transform duration-500">
            <img
              src={brand.logo}
              alt={brandName}
              loading="lazy"
              className="w-20 h-20 object-contain drop-shadow-sm"
            />
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-bmw-blue transition-colors">
            {brandName}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2">
            {brandDescription}
          </p>

          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-zinc-200 dark:bg-zinc-800"></div>
            <span className="text-bmw-blue font-bold text-xs uppercase tracking-[0.2em]">
              {vehiclesCount} {language === "es" ? "Modelos" : "Models"}
            </span>
            <div className="h-px w-8 bg-zinc-200 dark:bg-zinc-800"></div>
          </div>
        </div>

        {/* Hover Highlight */}
        <div className="absolute inset-x-10 bottom-0 h-1 bg-bmw-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full"></div>
      </Link>
    </motion.div>
  );
};

export default function Brand() {
  const { language } = useLanguage();

  const sortedBrands = useMemo(
    () =>
      [...brands].sort((a, b) =>
        (a.translations?.[language]?.name || a.name).localeCompare(
          b.translations?.[language]?.name || b.name
        )
      ),
    [language]
  );

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black pt-32 pb-24 overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white dark:from-zinc-900/50 to-transparent -z-10"></div>

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-bmw-blue/10 text-bmw-blue rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Shield className="w-4 h-4" />
            {language === 'es' ? 'Herencia y Prestigio' : 'Heritage and Prestige'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-8"
          >
            {language === "es" ? "Nuestras " : "Our "}<span className="text-bmw-blue">{language === 'es' ? 'Marcas' : 'Brands'}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 dark:text-zinc-400 text-xl leading-relaxed"
          >
            {language === "es"
              ? "Desde el rugido de Maranello hasta la elegancia de Goodwood. Colaboramos con los fabricantes más prestigiosos del mundo para ofrecerte la excelencia automotriz."
              : "From the roar of Maranello to the elegance of Goodwood. We partner with the world's most prestigious manufacturers to bring you automotive excellence."}
          </motion.p>
        </div>

        {/* Stats / Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24 max-w-5xl mx-auto">
          {[
            { icon: Award, label: language === 'es' ? 'Calidad Certificada' : 'Certified Quality' },
            { icon: Trophy, label: language === 'es' ? 'Historial en Pista' : 'Track Heritage' },
            { icon: Shield, label: language === 'es' ? 'Garantía Global' : 'Global Warranty' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="flex items-center gap-4 p-6 bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800"
            >
              <div className="w-12 h-12 bg-bmw-blue text-white rounded-xl flex items-center justify-center shrink-0">
                <feature.icon className="w-6 h-6" />
              </div>
              <span className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-sm">{feature.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Brands Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedBrands.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} language={language} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 bg-zinc-900 rounded-[3rem] text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-bmw-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <h2 className="text-3xl font-bold text-white mb-6">
            {language === 'es' ? '¿Buscas algo específico?' : 'Looking for something specific?'}
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            {language === 'es'
              ? 'Nuestros asesores pueden ayudarte a encontrar el modelo exacto que se adapte a tu estilo de vida.'
              : 'Our advisors can help you find the exact model that fits your lifestyle.'}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-zinc-900 font-bold rounded-2xl hover:bg-bmw-blue hover:text-white transition-all duration-300"
          >
            {language === 'es' ? 'Hablar con un Experto' : 'Speak with an Expert'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
