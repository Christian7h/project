import { useState, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { vehicles } from "../data";
import { useLanguage } from "../context/LanguageContext";

// Componente principal del configurador
const VehicleConfigurator = memo(() => {
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

  // Mapeo de uso a tipos de vehículos
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4">
        {/* Header mejorado */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-bmw-blue rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              {language === "es"
                ? "Descubre tu vehículo ideal"
                : "Discover your ideal vehicle"}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
            {language === "es"
              ? "Configurador inteligente que encuentra el vehículo perfecto para ti"
              : "Smart configurator that finds the perfect vehicle for you"}
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400 text-black rounded-full text-sm font-semibold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            BETA
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {!showResults ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-gray-200 dark:border-zinc-700"
            >
              {/* Barra de progreso mejorada - responsive */}
              <div className="flex justify-between mb-6 md:mb-8 px-2">
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                index === step
                  ? "bg-bmw-blue ring-4 ring-bmw-blue/20 scale-110"
                  : index < step
                  ? "bg-green-500"
                  : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
                {index < 4 && (
                  <div
                className={`h-1 mt-2 transition-all duration-300 ${
                  index < step ? "bg-green-500" : "bg-gray-300 dark:bg-gray-700"
                }`}
                style={{ width: "100%" }}
                  />
                )}
              </div>
            ))}
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-gray-900 dark:text-white px-2">
            {questions[language][step].title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {questions[language][step].options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className="group p-4 md:p-6 border-2 border-gray-200 dark:border-gray-700 rounded-xl
                  hover:border-bmw-blue dark:hover:border-bmw-blue
                  hover:bg-bmw-blue/5 dark:hover:bg-bmw-blue/10
                  transition-all duration-300 text-left
                  text-gray-800 dark:text-gray-200 hover:text-bmw-blue dark:hover:text-bmw-lightblue
                  transform hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm md:text-base">{option}</span>
                  <svg className="w-4 h-4 md:w-5 md:h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
              </div>

              {step > 0 && (
            <div className="mt-6 md:mt-8 text-center">
              <button
                onClick={handleReset}
                className="px-4 md:px-6 py-2 text-gray-600 dark:text-gray-400 hover:text-bmw-blue dark:hover:text-bmw-lightblue transition-colors font-medium text-sm md:text-base"
              >
                ← {language === "es" ? "Comenzar de nuevo" : "Start over"}
              </button>
            </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 md:space-y-8 px-4 sm:px-0"
            >
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 md:mb-8 gap-4">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {language === "es"
                ? "🎯 Vehículos Recomendados"
                : "🎯 Recommended Vehicles"}
            </h3>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-bmw-blue to-bmw-lightblue text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium text-sm md:text-base"
            >
              {language === "es"
                ? "Nueva configuración"
                : "New configuration"}
            </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {suggestedVehicles.map((vehicle) => {
              const { name, description } =
                vehicle.translations?.[language] || vehicle;

              const formattedPrice = formatPrice(vehicle.price);

              return (
                <Link
                  key={vehicle.id}
                  to={`/vehicles/${vehicle.id}`}
                  className="group relative bg-white dark:bg-zinc-900 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:scale-105 border border-gray-200 dark:border-zinc-700"
                >
                  <div className="aspect-video relative overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300" />
                <div className="absolute top-2 md:top-4 right-2 md:right-4">
                  <span className="bg-green-500 text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium">
                    {language === "es" ? "Recomendado" : "Recommended"}
                  </span>
                </div>
                  </div>
                  <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-bmw-blue transition-colors">
                  {name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-xs md:text-sm">
                  {description}
                </p>
                <p className="text-xl md:text-2xl font-bold text-bmw-blue dark:text-bmw-lightblue">
                  {formattedPrice}
                </p>
                  </div>
                </Link>
              );
            })}
              </div>

              {suggestedVehicles.length === 0 && (
            <div className="text-center py-8 md:py-12">
              <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 md:w-12 md:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-1.067-5.93-2.709" />
                </svg>
              </div>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
                {language === "es"
                  ? "No encontramos vehículos que coincidan perfectamente"
                  : "No vehicles found that match perfectly"}
              </p>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-500 mb-4 md:mb-6">
                {language === "es"
                  ? "Intenta ajustar tus preferencias para obtener mejores resultados"
                  : "Try adjusting your preferences for better results"}
              </p>
              <button
                onClick={handleReset}
                className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-bmw-blue to-bmw-lightblue text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium text-sm md:text-base"
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

VehicleConfigurator.displayName = "VehicleConfigurator";

export default VehicleConfigurator;
