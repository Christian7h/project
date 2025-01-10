import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer.tsx";
import ScrollToTop from "./components/ScrollTop.tsx";
import { Outlet } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import { LanguageProvider } from "./context/LanguageContext.tsx";
import { FavoritesProvider } from "./context/FavoritesContext";  // Importar el proveedor del contexto
import ScrollProgress from "./components/ScrollProgress";
import { CartProvider } from './context/CartContext';
import { CheckoutProvider } from './context/CheckoutContext';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark" // Recuperar del almacenamiento local
  );

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
      <CheckoutProvider>
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
        </CheckoutProvider>
        </CartProvider>
      </FavoritesProvider>
    </div>
  );
}

export default App;
