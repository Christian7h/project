import { useEffect, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer.tsx";
import ScrollToTop from "./components/ScrollTop.tsx";
import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ScrollProgress";
import { LanguageProvider } from "./context/LanguageContext.tsx";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CartProvider } from './context/CartContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  return (
    <div >
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
                    <Outlet />
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