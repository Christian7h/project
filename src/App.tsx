import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer.tsx";
import ScrollToTop from "./components/ScrollTop.tsx";
import "./App.css";
import { Outlet } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <>
            <main className="bg-white dark:bg-gray-900 transition-colors duration-300">
            <ScrollToTop />
            <Navigation />
              <Outlet /> {/* Renderiza las rutas hijas */}
            <Footer />

            </main>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
