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
import ReactGA from 'react-ga4';

const TRACKING_ID="G-DWNH2G6WXW";
ReactGA.initialize(TRACKING_ID, {
  // Configura gtag para adaptarse al nuevo modelo
  gtagOptions: {
    cookieFlags: "SameSite=None;Secure", // Marca las cookies como seguras
  },
});

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark" // Recuperar del almacenamiento local
  );

  const location =useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType:"pageview",
      page:location.pathname+location.search,
      title:location.pathname+location.search,
      location:location.pathname+location.search,
      consentMode: true,
    })
    ReactGA.set({page:location.pathname+location.search})
  },[location])

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
