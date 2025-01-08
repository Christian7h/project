import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react"; // Importa los íconos de luz y luna
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Navigation({ isDarkMode, toggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
// Obtén el idioma y la función toggleLanguage desde el contexto
const { language, toggleLanguage } = useLanguage(); 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-100 dark:bg-black/90 shadow-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-bmw-blue dark:text-bmw-blue"
        >
          Luxury Motors
        </Link>

        {/* Links de navegación */}
        <div className="font-bold hidden md:flex space-x-8 text-gray-800 dark:text-gray-200">
          <Link
            to="/"
            className="hover:text-bmw-blue dark:hover:text-bmw-blue transition"
          >
            {language === 'es' ? 'Inicio' : 'Home'}
            </Link>
          <Link
            to="/brands"
            className="hover:text-bmw-blue dark:hover:text-bmw-blue transition"
          >
            {language === 'es' ? 'Marcas' : 'Brands'}
            </Link>
          <Link
            to="/contact"
            className="hover:text-bmw-blue dark:hover:text-bmw-blue transition"
          >
            {language === 'es' ? 'Contacto' : 'Contact'}
            </Link>
        </div>

        {/* Botones */}
        <div className="flex items-center space-x-4">
          <button
            className="bg-bmw-blue text-white px-6 py-2 rounded hover:bg-bmw-blue/90 transition"
            aria-label="Schedule a test drive"
          >
            {language === 'es' ? 'Prueba de Manejo' : 'Test Drive'}
            </button>
          <button
            onClick={toggleDarkMode}
            className="text-white bg-bmw-blue/35 dark:bg-bmw-blue/35 dark:text-bmw-blue px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            {/* Muestra el ícono correspondiente al modo actual */}
            {isDarkMode ? (
              <Moon className="w-auto h-auto" /> // Ícono de luna para modo oscuro
            ) : (
              <Sun className="w-auto h-auto" /> // Ícono de sol para modo claro
            )}
          </button>
          <button
            onClick={toggleLanguage} // Cambia el idioma cuando el usuario haga clic
            className="text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            {language === 'es' ? 'Es' : 'En'} 
        </button>
        </div>
      </div>
    </nav>
  );
}
