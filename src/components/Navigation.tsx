import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Send,Settings,Heart } from "lucide-react"; // Importar íconos adicionales
import { useLanguage } from '../context/LanguageContext.jsx';
import CartDropdown from './CartDropdown';
import { useCart } from '../context/CartContext';

export default function Navigation({ isDarkMode, toggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Nuevo estado para el menú
  const { language, toggleLanguage } = useLanguage(); 
  const { getItemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed w-full z-20 transition-all duration-300 ${
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
            to="ListVehicles"
            className="hover:text-bmw-blue dark:hover:text-bmw-blue transition"
          >
            {language === 'es' ? 'Vehículos' : 'Vehicles'}
          </Link>
        </div>

        {/* Botones */}
        <div className="flex items-center space-x-4">

          <Link to='favorites'>
            <button
              className="bg-bmw-blue text-white px-6 py-2 rounded hover:bg-bmw-blue/90 transition"
              aria-label="Schedule a test drive"
            >
                          <Heart className="w-5 h-5" />
            </button>
          </Link>
          <Link to='contact'>
            <button
              className="bg-bmw-blue text-white px-4 py-2 rounded hover:bg-bmw-blue/90 transition"
              aria-label="Schedule a test drive"
            >
                    <Send className="w-5 h-5" />
                    </button>
          </Link>
          <div className="relative">
            <button
              onClick={handleMenuToggle}
              className="text-white bg-gray-700/40 px-4 py-2 rounded hover:bg-gray-600 transition flex items-center"
            >
              <Settings className="w-5 h-5" /> {/* Ícono de globo para opciones */}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded shadow-lg z-50">
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />

                  ) : (
                    <Moon className="w-5 h-5" />

                  )}
                  {/* Eliminar el texto aquí */}
                </button>
                <button
                  onClick={toggleLanguage}
                  className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  {/* <Globe className="w-5 h-5 " /> Ícono de globo para cambiar idioma */}
                  {language === 'es' ? 'EN' : 'ES'}

                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <CartDropdown />
            {getItemCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {getItemCount()}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
