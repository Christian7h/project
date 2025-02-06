import { useEffect, useMemo, memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { brands, vehicles } from "../data";
import HeroSection from "../components/Hero";
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

// Componente memoizado para tarjetas de marca
const BrandCard = memo(
  ({ brand, language }: { brand: any; language: string }) => {
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
        className="group relative bg-zinc-100 dark:bg-zinc-900 p-8 rounded-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-bmw-blue dark:focus:ring-bmw-blue"
        aria-label={`${translations.name} - ${translations.description}`}
      >
        <div className="relative">
          <img
            src={brand.logo}
            alt={translations.name}
            loading="lazy"
            width={128}
            height={128}
            className="w-32 h-32 mx-auto mb-4  transition-all duration-300 hover:scale-[1.05] object-contain aspect-square"
            decoding="async"
          />
        </div>
        <h3 className="text-black dark:text-white text-2xl font-bold mb-2 animate-slide-up animate-fade-in animate-duration-300">
          {translations.name}
        </h3>
        <p className="text-gray-900 dark:text-gray-400 text-lg line-clamp-3 animate-fade-in">
          {translations.description}
        </p>
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

// Nuevo componente para el Configurador Rápido
const QuickConfigurator = memo(() => {
  const { language } = useLanguage();
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({
    type: "",
    budget: "",
    usage: "",
    features: "",
    frequency: "",
  });
  const [showResults, setShowResults] = useState(false);

  // Función formatPrice actualizada para CLP
  const formatPrice = useCallback((price: string) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(Number(price));
  }, []);

  // Obtener tipos únicos de vehículos desde data.ts
  const uniqueVehicleTypes = useMemo(() => {
    const types = new Set(
      vehicles.map(
        (vehicle) => vehicle.translations?.[language]?.type || vehicle.type
      )
    );
    return Array.from(types);
  }, [language]);

  // Obtener rangos de precio basados en los datos reales
  const priceRanges = useMemo(() => {
    const prices = vehicles.map((v) => Number(v.price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Crear 5 rangos de precio más específicos
    return [
      `${formatPrice(String(minPrice))} - ${formatPrice(
        String(minPrice + (maxPrice - minPrice) * 0.2)
      )}`,
      `${formatPrice(
        String(minPrice + (maxPrice - minPrice) * 0.2)
      )} - ${formatPrice(String(minPrice + (maxPrice - minPrice) * 0.4))}`,
      `${formatPrice(
        String(minPrice + (maxPrice - minPrice) * 0.4)
      )} - ${formatPrice(String(minPrice + (maxPrice - minPrice) * 0.6))}`,
      `${formatPrice(
        String(minPrice + (maxPrice - minPrice) * 0.6)
      )} - ${formatPrice(String(minPrice + (maxPrice - minPrice) * 0.8))}`,
      `${formatPrice(
        String(minPrice + (maxPrice - minPrice) * 0.8)
      )} - ${formatPrice(String(maxPrice))}`,
      `${formatPrice(String(maxPrice))}+`,
    ];
  }, [formatPrice]);

  // Agrupar tipos de vehículos en categorías principales
  const vehicleCategories = useMemo(
    () => ({
      es: [
        {
          name: "SUV",
          types: [
            "SUV",
            "SUV Eléctrico",
            "Luxury SUV",
            "SUV de Lujo",
            "Crossover",
          ],
        },
        {
          name: "Deportivo",
          types: [
            "Sports Car",
            "Coupé Deportivo",
            "Performance Sedan",
            "Gran Turismo",
          ],
        },
        {
          name: "Sedán",
          types: ["Sedán", "Sedán Ejecutivo", "Sports Sedan", "Luxury Sedan"],
        },
        {
          name: "Eléctrico",
          types: ["SUV Eléctrico", "Electric SUV", "Electric Vehicle"],
        },
        {
          name: "Lujo",
          types: ["Luxury SUV", "Luxury Sedan", "Gran Turismo"],
        },
        {
          name: "Todos",
          types: uniqueVehicleTypes,
        },
      ],
      en: [
        {
          name: "SUV",
          types: ["SUV", "Electric SUV", "Luxury SUV", "Crossover"],
        },
        {
          name: "Sports",
          types: [
            "Sports Car",
            "Sports Coupe",
            "Performance Sedan",
            "Gran Turismo",
          ],
        },
        {
          name: "Sedan",
          types: ["Sedan", "Executive Sedan", "Sports Sedan", "Luxury Sedan"],
        },
        {
          name: "Electric",
          types: ["Electric SUV", "Electric Vehicle"],
        },
        {
          name: "Luxury",
          types: ["Luxury SUV", "Luxury Sedan", "Gran Turismo"],
        },
        {
          name: "All",
          types: uniqueVehicleTypes,
        },
      ],
    }),
    [uniqueVehicleTypes]
  );

  // Preguntas expandidas
  const questions = useMemo(
    () => ({
      es: [
        {
          title: "¿Qué categoría de vehículo prefieres?",
          options: vehicleCategories.es.map((cat) => cat.name),
        },
        {
          title: "¿Cuál es tu presupuesto?",
          options: priceRanges,
        },
        {
          title: "¿Principal uso del vehículo?",
          options: [
            "Ciudad",
            "Viajes",
            "Trabajo",
            "Lujo",
            "Deportivo",
            "Familiar",
            "Aventura",
            "Ejecutivo",
            "Ecológico",
            "Todos",
          ],
        },
        {
          title: "¿Qué características son más importantes para ti?",
          options: [
            "Rendimiento",
            "Confort",
            "Tecnología",
            "Seguridad",
            "Espacio",
            "Economía",
            "Diseño",
            "Todas",
          ],
        },
        {
          title: "¿Con qué frecuencia usarás el vehículo?",
          options: [
            "Uso diario",
            "Fines de semana",
            "Ocasional",
            "Viajes largos",
            "Uso mixto",
          ],
        },
      ],
      en: [
        {
          title: "What vehicle category do you prefer?",
          options: vehicleCategories.en.map((cat) => cat.name),
        },
        {
          title: "What's your budget?",
          options: priceRanges,
        },
        {
          title: "Main vehicle usage?",
          options: [
            "City",
            "Travel",
            "Work",
            "Luxury",
            "Sports",
            "Family",
            "Adventure",
            "Executive",
            "Eco-friendly",
            "All",
          ],
        },
        {
          title: "Which features are most important to you?",
          options: [
            "Performance",
            "Comfort",
            "Technology",
            "Safety",
            "Space",
            "Economy",
            "Design",
            "All",
          ],
        },
        {
          title: "How often will you use the vehicle?",
          options: [
            "Daily use",
            "Weekends",
            "Occasional",
            "Long trips",
            "Mixed use",
          ],
        },
      ],
    }),
    [vehicleCategories, priceRanges]
  );

  // Agregar el usageTypeMapping que faltaba
  const usageTypeMapping = useMemo(
    () => ({
      Ciudad: [
        "Sedán",
        "SUV",
        "Hatchback",
        "SUV Eléctrico",
        "Electric SUV",
        "Compact",
      ],
      Viajes: [
        "SUV",
        "Gran Turismo",
        "Sedán Ejecutivo",
        "Luxury SUV",
        "Performance Sedan",
        "Touring",
      ],
      Trabajo: [
        "SUV",
        "Sedán",
        "Performance Sedan",
        "Sports Sedan",
        "Luxury SUV",
        "Executive",
      ],
      Lujo: [
        "Coupé Deportivo",
        "Sports Car",
        "Luxury SUV",
        "Gran Turismo",
        "Performance Sedan",
        "Luxury Sedan",
      ],
      Deportivo: [
        "Sports Car",
        "Performance Sedan",
        "Coupé Deportivo",
        "Gran Turismo",
        "Sports Sedan",
      ],
      Familiar: [
        "SUV",
        "Minivan",
        "Station Wagon",
        "Family SUV",
        "Luxury SUV",
        "Crossover",
      ],
      Aventura: [
        "SUV",
        "Crossover",
        "Off-road SUV",
        "Adventure SUV",
        "4x4",
        "All-Terrain",
      ],
      Ejecutivo: [
        "Sedán Ejecutivo",
        "Luxury Sedan",
        "Gran Turismo",
        "Executive Sedan",
        "Performance Sedan",
      ],
      Ecológico: [
        "SUV Eléctrico",
        "Electric SUV",
        "Hybrid",
        "Electric Vehicle",
        "Eco-friendly",
      ],
      Todos: uniqueVehicleTypes,
      // Versiones en inglés
      City: ["Sedan", "SUV", "Hatchback", "Electric SUV", "Compact"],
      Travel: [
        "SUV",
        "Gran Turismo",
        "Executive Sedan",
        "Luxury SUV",
        "Performance Sedan",
        "Touring",
      ],
      Work: [
        "SUV",
        "Sedan",
        "Performance Sedan",
        "Sports Sedan",
        "Luxury SUV",
        "Executive",
      ],
      Luxury: [
        "Sports Coupe",
        "Sports Car",
        "Luxury SUV",
        "Gran Turismo",
        "Performance Sedan",
        "Luxury Sedan",
      ],
      Sports: [
        "Sports Car",
        "Performance Sedan",
        "Sports Coupe",
        "Gran Turismo",
        "Sports Sedan",
      ],
      Family: [
        "SUV",
        "Minivan",
        "Station Wagon",
        "Family SUV",
        "Luxury SUV",
        "Crossover",
      ],
      Adventure: [
        "SUV",
        "Crossover",
        "Off-road SUV",
        "Adventure SUV",
        "4x4",
        "All-Terrain",
      ],
      Executive: [
        "Executive Sedan",
        "Luxury Sedan",
        "Gran Turismo",
        "Performance Sedan",
      ],
      "Eco-friendly": [
        "Electric SUV",
        "Hybrid",
        "Electric Vehicle",
        "Eco-friendly",
      ],
      All: uniqueVehicleTypes,
    }),
    [uniqueVehicleTypes]
  );

  // Sistema de puntuación para vehículos
  const suggestedVehicles = useMemo(() => {
    if (!preferences.type || !preferences.budget || !preferences.usage)
      return [];

    const selectedCategory = vehicleCategories[language].find(
      (cat) => cat.name === preferences.type
    );

    const validTypes = selectedCategory?.types || [];

    // Extraer rango de precios
    const [minStr, maxStr] = preferences.budget
      .split(" - ")
      .map((str) => parseFloat(str.replace(/[^\d]/g, "")));
    const minPrice = minStr || 0;
    const maxPrice = maxStr || Infinity;

    // Algoritmo de puntuación mejorado
    const scoredVehicles = vehicles.map((vehicle) => {
      const vehicleType =
        vehicle.translations?.[language]?.type || vehicle.type;
      const price = parseInt(vehicle.price);
      let score = 0;

      // Puntuación por tipo (0-40 puntos)
      if (preferences.type === "Todos" || preferences.type === "All") {
        score += 30;
      } else {
        const typeMatch = validTypes.some((type) =>
          vehicleType.toLowerCase().includes(type.toLowerCase())
        );
        if (typeMatch) score += 40;
        else if (
          validTypes.some((type) =>
            vehicleType.toLowerCase().includes(type.split(" ")[0].toLowerCase())
          )
        )
          score += 20;
      }

      // Puntuación por precio (0-30 puntos)
      if (price >= minPrice && price <= maxPrice) {
        score += 30;
      } else {
        const priceDiff = Math.min(
          Math.abs(price - minPrice),
          Math.abs(price - maxPrice)
        );
        const priceRange = maxPrice - minPrice;
        if (priceDiff <= priceRange * 0.2) score += 20;
        else if (priceDiff <= priceRange * 0.4) score += 10;
      }

      // Puntuación por uso (0-30 puntos)
      if (preferences.usage === "Todos" || preferences.usage === "All") {
        score += 20;
      } else {
        const usageTypes = usageTypeMapping[preferences.usage] || [];
        const exactMatch = usageTypes.some(
          (type) => vehicleType.toLowerCase() === type.toLowerCase()
        );
        const partialMatch = usageTypes.some((type) =>
          vehicleType.toLowerCase().includes(type.toLowerCase())
        );

        if (exactMatch) score += 30;
        else if (partialMatch) score += 20;
      }

      // Bonus por características especiales (0-20 puntos extra)
      const bonusFeatures = {
        Ecológico: ["electric", "hybrid", "eco"],
        Lujo: ["luxury", "premium", "executive"],
        Deportivo: ["sport", "performance", "gt"],
        Familiar: ["family", "space", "comfort"],
      };

      const vehicleDescription = (
        vehicle.translations?.[language]?.description ||
        vehicle.description ||
        ""
      ).toLowerCase();

      Object.entries(bonusFeatures).forEach(([category, keywords]) => {
        if (preferences.usage.toLowerCase().includes(category.toLowerCase())) {
          if (
            keywords.some(
              (keyword) =>
                vehicleDescription.includes(keyword) ||
                vehicleType.toLowerCase().includes(keyword)
            )
          ) {
            score += 20;
          }
        }
      });

      return {
        vehicle,
        score,
        matchDetails: {
          type: vehicleType,
          price,
          score,
        },
      };
    });

    // Ordenar por puntuación y seleccionar los mejores resultados
    return scoredVehicles
      .filter(({ score }) => score >= 40) // Mínimo 40% de coincidencia
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ vehicle }) => vehicle);
  }, [preferences, language, vehicleCategories, usageTypeMapping]);

  const handleSelect = (option: string) => {
    const fields = ["type", "budget", "usage", "features", "frequency"];
    setPreferences((prev) => ({
      ...prev,
      [fields[step]]: option,
    }));

    if (step < fields.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setPreferences({
      type: "",
      budget: "",
      usage: "",
      features: "",
      frequency: "",
    });
    setStep(0);
    setShowResults(false);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h2 className="text-4xl font-bold text-center text-black dark:text-bmw-blue">
            {language === "es"
              ? "Descubre tu vehículo ideal"
              : "Discover your ideal vehicle"}
          </h2>
        </div>
        <div className="flex items-center justify-center mb-4">
          <span className="px-2 py-1text-xs font-semibold bg-yellow-400 text-black rounded-md">
            BETA
          </span>
        </div>
        <div className="max-w-6xl mx-auto">
          {!showResults ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-zinc-900 rounded-xl p-8 shadow-xl"
            >
              <div className="flex justify-between mb-8">
                {[0, 1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === step
                        ? "bg-bmw-blue"
                        : index < step
                        ? "bg-green-500"
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  />
                ))}
              </div>

              <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">
                {questions[language][step].title}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {questions[language][step].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg
                      hover:border-bmw-blue dark:hover:border-bmw-blue
                      hover:bg-gray-50 dark:hover:bg-zinc-800
                      transition-all duration-300
                      text-gray-800 dark:text-gray-200"
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Agregar botón para reiniciar */}
              {step > 0 && (
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-bmw-blue dark:hover:text-bmw-blue transition-colors"
                >
                  {language === "es" ? "Comenzar de nuevo" : "Start over"}
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold text-black dark:text-white">
                  {language === "es"
                    ? "Vehículos Recomendados"
                    : "Recommended Vehicles"}
                </h3>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-bmw-blue text-white rounded-md hover:bg-bmw-blue/90 transition-colors"
                >
                  {language === "es"
                    ? "Nueva configuración"
                    : "New configuration"}
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {suggestedVehicles.map((vehicle) => {
                  const { name, description } =
                    vehicle.translations?.[language] || vehicle;

                  const formattedPrice = formatPrice(vehicle.price);

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

              {suggestedVehicles.length === 0 && (
                <div className="text-center text-gray-600 dark:text-gray-400">
                  <p className="text-xl">
                    {language === "es"
                      ? "No encontramos vehículos que coincidan con tus preferencias"
                      : "No vehicles found matching your preferences"}
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-6 py-2 bg-bmw-blue text-white rounded-md hover:bg-bmw-blue/90 transition-colors"
                  >
                    {language === "es" ? "Intentar de nuevo" : "Try again"}
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
});

export default function Home() {
  const { language } = useLanguage();

  // Memoizar datos calculados
  const [totalVehicles, totalBrands] = useMemo(
    () => [vehicles.length, brands.length],
    []
  );

  // Memoizar traducciones de marcas
  const sortedBrands = useMemo(
    () =>
      [...brands].sort((a, b) =>
        (a.translations?.[language]?.name || a.name).localeCompare(
          b.translations?.[language]?.name || b.name
        )
      ),
    [language]
  );

  // En el componente principal, mostrar solo 3 marcas + el enlace
  const featuredBrands = useMemo(() => {
    // Seleccionar las primeras 3 marcas
    return brands.slice(0, 7);
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <HeroSection />
      {/* <ImageCarousel /> */}

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

      <QuickConfigurator />

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
      </section>
    </main>
  );
}
