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
    ReactGA.set({consentMode:true})
  },[])

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

  useEffect(() => {
    // Enviar evento de presencia cada 30 segundos
    const interval = setInterval(() => {
      ReactGA.event({
        category: 'User',
        action: 'Active',
        label: 'User is active'
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    // Obtener la ubicación del usuario usando la API de geolocalización
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        // Enviar el país del usuario a GA4
        ReactGA.event({
          category: 'User',
          action: 'Country',
          label: data.country_name
        });
        console.log(data.country_name)
        
        // Establecer la dimensión personalizada para el país
        ReactGA.set({
          country: data.country_name,
          region: data.region,
          city: data.city
        });
      })
      .catch(error => {
        console.error('Error al obtener la ubicación:', error);
      });
  }, []);

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
