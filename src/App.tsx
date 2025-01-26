import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer.tsx";
import ScrollToTop from "./components/ScrollTop.tsx";
import { Outlet,useLocation } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import { LanguageProvider } from "./context/LanguageContext.tsx";
import { FavoritesProvider } from "./context/FavoritesContext";  // Importar el proveedor del contexto
import ScrollProgress from "./components/ScrollProgress";
import { CartProvider } from './context/CartContext';
import { initializeGA } from "./analtytics"; // Importa la inicialización de GA

// Configuración inicial de Google Analytics
const GA_MEASUREMENT_ID = "G-DWNH2G6WXW"; // Tu ID de Google Analytics

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark" // Recuperar del almacenamiento local
  );
  const location = useLocation(); // Obtiene la ubicación actual

  useEffect(() => {
    // Inicializa Google Analytics
    const gtag = initializeGA(GA_MEASUREMENT_ID);

    // Trackea la página inicial
    gtag("config", GA_MEASUREMENT_ID, {
      page_path: location.pathname,
    });
  }, []);

  useEffect(() => {
    // Trackea cambios de ruta
    window.gtag?.("config", GA_MEASUREMENT_ID, {
      page_path: location.pathname,
    });
  }, [location]);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <div>
      <FavoritesProvider>
      <CartProvider>
        <LanguageProvider>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen key="loading" />
            ) : (
              <>
                <ScrollProgress />
                <main>
                  <ScrollToTop />
                  <Navigation
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                  <Outlet /> {/* Renderiza las rutas hijas */}
                  <Footer />
                </main>
              </>
            )}
          </AnimatePresence>
        </LanguageProvider>
        </CartProvider>
      </FavoritesProvider>
    </div>
  );
}

export default App;
