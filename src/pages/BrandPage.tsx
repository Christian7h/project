import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { brands, vehicles } from "../data";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, History, Trophy, ArrowRight, Zap, Gauge, Wind, Heart } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useFavorites } from "../context/useFavorites";
import { Brand as BrandType, Vehicle as VehicleType } from "../types";

const formatPrice = (price: string) => {
  const num = parseInt(price);
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(num * 1000);
};

function BrandHero({ brand, language }: { brand: BrandType; language: string }) {
  const { name, description } = brand.translations?.[language] || brand;

  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-zinc-950">
      {/* Background Decor */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-bmw-blue/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4"></div>

        {/* Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12 inline-block"
        >
          <div className="p-8 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl">
            <img
              src={brand.logo}
              alt={name}
              className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tight"
        >
          {name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto font-medium"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}

function BrandDetails({ brand, language }: { brand: BrandType; language: string }) {
  const { history, trajectory, foundation } = brand.translations?.[language] || brand;

  const details = [
    { icon: Calendar, label: language === 'es' ? 'Fundación' : 'Foundation', value: foundation },
    { icon: History, label: language === 'es' ? 'Herencia' : 'Heritage', value: history },
    { icon: Trophy, label: language === 'es' ? 'Logros' : 'Achievements', value: trajectory },
  ];

  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {details.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-zinc-900/50 rounded-[2rem] border border-zinc-800 hover:border-bmw-blue/50 transition-colors group"
            >
              <div className="w-14 h-14 bg-bmw-blue/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-bmw-blue group-hover:text-white transition-all duration-500">
                <item.icon className="w-7 h-7 text-bmw-blue group-hover:text-white" />
              </div>
              <h3 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-4">{item.label}</h3>
              <p className="text-zinc-200 text-lg leading-relaxed">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const VehicleCard = ({ vehicle, language, isFavorite, onToggleFavorite }: {
  vehicle: VehicleType;
  language: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}) => {
  const vName = vehicle.translations?.[language]?.name || vehicle.name;
  const vType = vehicle.translations?.[language]?.type || vehicle.type;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-bmw-blue/30 transition-all duration-500"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <LazyLoadImage
          src={vehicle.image}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={vName}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(vehicle.id);
          }}
          className={`absolute top-4 right-4 z-10 p-3 rounded-full backdrop-blur-md transition-all duration-300 ${isFavorite ? "bg-red-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
            }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`} />
        </button>

        <div className="absolute bottom-6 left-6 text-white">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-bmw-blue mb-1 block">{vType}</span>
          <h3 className="text-2xl font-bold">{vName}</h3>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-3 gap-6 mb-8 py-6 border-y border-zinc-800">
          <div className="text-center">
            <Zap className="w-5 h-5 text-zinc-500 mb-2 mx-auto" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{vehicle.specs.power}</span>
          </div>
          <div className="text-center">
            <Gauge className="w-5 h-5 text-zinc-500 mb-2 mx-auto" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{vehicle.specs.acceleration}</span>
          </div>
          <div className="text-center">
            <Wind className="w-5 h-5 text-zinc-500 mb-2 mx-auto" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{vehicle.specs.topSpeed}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-white">{formatPrice(vehicle.price)}</span>
          <Link
            to={`/vehicles/${vehicle.id}`}
            className="w-12 h-12 bg-bmw-blue rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function BrandPage() {
  const { brandId } = useParams<{ brandId: string }>();
  const { language } = useLanguage();
  const { favorites, toggleFavorite } = useFavorites();

  const brand = useMemo(() => brands.find((b) => b.id === brandId), [brandId]);
  const brandVehicles = useMemo(
    () => vehicles.filter((v) => v.brandId === brandId),
    [brandId]
  );

  if (!brand) return <LoadingSpinner />;

  return (
    <main className="min-h-screen bg-black scroll-smooth">
      <BrandHero brand={brand} language={language} />

      <div className="relative">
        {/* Floating Back Button */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <Link
            to="/brands"
            className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-2xl shadow-2xl font-bold hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
            {language === 'es' ? 'Todas las Marcas' : 'All Brands'}
          </Link>
        </div>

        <BrandDetails brand={brand} language={language} />

        <section className="py-24 container mx-auto px-4">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">
                {language === "es" ? "Evolución en Pista" : "Track Evolution"}
              </h2>
              <p className="text-zinc-500">{language === 'es' ? 'Modelos actualmente disponibles en nuestra flota.' : 'Models currently available in our fleet.'}</p>
            </div>
            <div className="text-right">
              <span className="text-5xl font-black text-zinc-800">{brandVehicles.length}</span>
              <p className="text-xs font-bold text-bmw-blue uppercase tracking-widest">{language === 'es' ? 'Unidades' : 'Units'}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
            <AnimatePresence>
              {brandVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  language={language}
                  isFavorite={favorites.includes(vehicle.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}
