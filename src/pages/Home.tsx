import { useEffect, useMemo, memo, useRef } from "react";
import { Link } from "react-router-dom";
import { brands, vehicles } from "../data";
import HeroSection from "../components/Hero";
import VehicleConfigurator from "../components/VehicleConfigurator";
import { useLanguage } from "../context/LanguageContext";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { Shield, Zap, Star, Globe, ArrowRight, Mail } from "lucide-react";
import { Brand } from "../types";

// Componente memoizado para números animados
const AnimatedNumber = memo(({ target }: { target: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, target, {
        duration: 2,
        ease: "easeOut",
      });
      return () => animation.stop();
    }
  }, [target, count, isInView]);

  return <motion.span ref={ref} aria-live="polite">{rounded}</motion.span>;
});

// Componente para tarjetas de marca con entrada animada
const BrandCard = memo(
  ({
    brand,
    language,
    index,
  }: {
    brand: Brand;
    language: string;
    index: number;
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Link
          to={`/brands/${brand.id}`}
          className="group relative block bg-white dark:bg-zinc-900 p-8 rounded-2xl text-center transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,76,132,0.15)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-zinc-100 dark:border-zinc-800 hover:border-bmw-blue/30 dark:hover:border-bmw-blue/30 overflow-hidden"
        >
          {/* Animated Background Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-bmw-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-bmw-blue/10 rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 blur-2xl"></div>
              <img
                src={brand.logo}
                alt={translations.name}
                className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="text-zinc-900 dark:text-white text-xl font-bold mb-2 group-hover:text-bmw-blue transition-colors">
              {translations.name}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2">
              {translations.description}
            </p>
          </div>
        </Link>
      </motion.div>
    );
  }
);

// Bento Grid para Categorías
const CategoryBento = ({ language }: { language: string }) => {
  const categories = [
    {
      title: language === 'es' ? 'Performance M' : 'M Performance',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80',
      size: 'md:col-span-2 md:row-span-2',
      color: 'from-blue-600/20',
    },
    {
      title: language === 'es' ? 'Eléctricos' : 'Electric Era',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80',
      size: 'md:col-span-1 md:row-span-1',
      color: 'from-purple-600/20',
    },
    {
      title: language === 'es' ? 'Clásicos' : 'Heritage',
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80',
      size: 'md:col-span-1 md:row-span-2',
      color: 'from-amber-600/20',
    },
    {
      title: language === 'es' ? 'Personalización' : 'Bespoke',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80',
      size: 'md:col-span-1 md:row-span-1',
      color: 'from-zinc-600/20',
    }
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6"
          >
            {language === 'es' ? 'Explora el Universo del Lujo' : 'Explore the Luxury Universe'}
          </motion.h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            {language === 'es'
              ? 'Desde la potencia pura de la serie M hasta la elegancia atemporal de nuestros clásicos certificados.'
              : 'From the raw power of the M series to the timeless elegance of our certified classics.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer ${cat.size} border border-zinc-200 dark:border-zinc-800`}
            >
              <img src={cat.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={cat.title} />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-transparent to-transparent opacity-60`}></div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                <div className="flex items-center text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  {language === 'es' ? 'Descubrir' : 'Discover'} <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Sección de Experiencia/Valores
const ExperienceSection = ({ language }: { language: string }) => {
  const features = [
    { icon: Shield, title: language === 'es' ? 'Garantía Élite' : 'Elite Warranty', text: language === 'es' ? 'Protección total para tu inversión con cobertura global.' : 'Full protection for your investment with global coverage.' },
    { icon: Zap, title: language === 'es' ? 'Entrega VIP' : 'VIP Delivery', text: language === 'es' ? 'Recibe tu vehículo en la puerta de tu casa con trato preferencial.' : 'Receive your vehicle at your doorstep with preferential treatment.' },
    { icon: Star, title: language === 'es' ? 'Calidad Certificada' : 'Certified Quality', text: language === 'es' ? 'Cada auto pasa por una inspección de 150 puntos clave.' : 'Every car undergoes a 150-point key inspection.' },
    { icon: Globe, title: language === 'es' ? 'Red Global' : 'Global Network', text: language === 'es' ? 'Acceso a inventario exclusivo de todo el mundo.' : 'Access to exclusive inventory from around the world.' },
  ];

  return (
    <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-bmw-blue/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-8">
              {language === 'es' ? 'La Excelencia es Nuestro Estándar' : 'Excellence is Our Standard'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 bg-bmw-blue/10 rounded-xl flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-bmw-blue" />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{f.title}</h4>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{f.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1603584173870-7f320f18838d?auto=format&fit=crop&q=80"
                className="w-full h-full object-cover"
                alt="Luxury Dealership"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-2xl border border-zinc-100 dark:border-zinc-800 max-w-[280px]">
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm italic mb-4">
                "La mejor experiencia de compra que he tenido. Profesionalismo absoluto de principio a fin."
              </p>
              <p className="text-sm font-bold text-zinc-900 dark:text-white">- Alejandro Rossi</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Sección de Newsletter
const Newsletter = ({ language }: { language: string }) => {
  return (
    <section className="py-24 bg-bmw-blue relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] border border-white/20 rounded-full animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {language === 'es' ? 'Únete al Círculo Exclusivo' : 'Join the Exclusive Circle'}
        </h2>
        <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
          {language === 'es'
            ? 'Recibe acceso prioritario a nuevos lanzamientos, eventos privados y ofertas de edición limitada.'
            : 'Get priority access to new releases, private events, and limited edition offers.'}
        </p>
        <form className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder={language === 'es' ? 'Tu correo electrónico' : 'Your email address'}
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
          />
          <button className="bg-white text-bmw-blue hover:bg-zinc-100 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
            {language === 'es' ? 'Suscribirse' : 'Subscribe'} <Mail className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

export default function Home() {
  const { language } = useLanguage();

  const [totalVehicles, totalBrands] = useMemo(
    () => [vehicles.length, brands.length],
    []
  );

  const featuredBrands = useMemo(() => brands.slice(0, 8), []);

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <HeroSection />

      {/* Sección de Marcas Destacadas */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-zinc-900 dark:text-bmw-blue text-4xl md:text-5xl font-bold mb-4"
            >
              {language === "es" ? "Marcas de Élite" : "Elite Brands"}
            </motion.h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              {language === "es" ? "Solo lo mejor de la ingeniería automotriz mundial." : "Only the best of global automotive engineering."}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredBrands.map((brand, index) => (
              <BrandCard key={brand.id} brand={brand} language={language} index={index} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/brands" className="inline-flex items-center gap-2 text-bmw-blue font-bold hover:gap-4 transition-all">
              {language === 'es' ? 'Ver todas las marcas' : 'View all brands'} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <CategoryBento language={language} />

      <ExperienceSection language={language} />

      <VehicleConfigurator />

      {/* Sección de Estadísticas con Diseño Mejorado */}
      <section className="py-24 bg-zinc-900 dark:bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-bmw-blue/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <div className="text-6xl font-bold text-white mb-2">
                <AnimatedNumber target={totalBrands} />+
              </div>
              <div className="text-bmw-blue font-bold uppercase tracking-wider text-sm">
                {language === "es" ? "Marcas Premium" : "Premium Brands"}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <div className="text-6xl font-bold text-white mb-2">
                <AnimatedNumber target={totalVehicles} />+
              </div>
              <div className="text-bmw-blue font-bold uppercase tracking-wider text-sm">
                {language === "es" ? "Modelos Únicos" : "Unique Models"}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <div className="text-6xl font-bold text-white mb-2">
                <AnimatedNumber target={100} />%
              </div>
              <div className="text-bmw-blue font-bold uppercase tracking-wider text-sm">
                {language === "es" ? "Satisfacción VIP" : "VIP Satisfaction"}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Newsletter language={language} />
    </main>
  );
}
