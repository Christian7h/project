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

// Configuración inicial de Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(...args: any[]) {
  window.dataLayer.push(args);
}
gtag('js', new Date());
gtag('config', 'G-DWNH2G6WXW'); // Reemplaza con tu ID de GA4

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark" // Recuperar del almacenamiento local
  );
  const location = useLocation(); // Obtiene la ubicación actual

  useEffect(() => {
    // Inicializa GA4
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-DWNH2G6WXW'; // Usa tu ID
    document.head.appendChild(script);

    // Trackea la página inicial
    gtag('config', 'G-DWNH2G6WXW', {
      page_path: window.location.pathname,
    });
  }, []);

  useEffect(() => {
    // Trackea cambios de ruta
    gtag('config', 'G-DWNH2G6WXW', {
      page_path: location.pathname,
    });
  }, [location]); // Se ejecuta cuando cambia la ruta

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
