import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Send, Settings, Heart } from "lucide-react";
import { useLanguage } from '../context/LanguageContext';
import CartDropdown from './CartDropdown';
import { useCart } from '../context/CartContext';

interface NavigationProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navigation({ isDarkMode, toggleDarkMode }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { getItemCount } = useCart();

  // Manejo del scroll con debounce
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };
    const debouncedScroll = () => {
      let timeoutId: number;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleScroll, 70);
      };
    };

    window.addEventListener("scroll", debouncedScroll());
    return () => window.removeEventListener("scroll", debouncedScroll());
  }, []);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuOpen && !(e.target as Element).closest('.settings-menu')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const NavLink = ({ to, text }: { to: string; text: string }) => (
    <Link
      to={to}
      className="hover:text-bmw-blue dark:hover:text-bmw-blue transition-colors duration-200"
      aria-label={text}
    >
      {text}
    </Link>
  );

  const IconButton = ({ 
    icon: Icon, 
    onClick, 
    ariaLabel,
    className = '',
    to // Nueva prop para enlaces
  }: {
    icon: React.ElementType;
    onClick?: () => void;
    ariaLabel: string;
    className?: string;
    to?: string; // Nueva prop opcional
  }) => (
    to ? (
      <Link
        to={to}
        className={`p-2 rounded-lg hover:bg-bmw-blue/10 transition-colors ${className}`}
        aria-label={ariaLabel}
      >
        <Icon className="w-5 h-5" />
      </Link>
    ) : (
      <button
        onClick={onClick}
        className={`p-2 rounded-lg hover:bg-bmw-blue/10 transition-colors ${className}`}
        aria-label={ariaLabel}
      >
        <Icon className="w-5 h-5" />
      </button>
    )
  );

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed w-full z-20 transition-all duration-300 ${
        isScrolled 
          ? "bg-gray-100/95 dark:bg-black/90 shadow-md backdrop-blur-sm py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-bmw-blue dark:text-bmw-blue hover:opacity-90 transition-opacity"
          aria-label="Home"
        >
          Luxury Motors
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-black dark:text-white">
          <NavLink to="/" text={language === 'es' ? 'Inicio' : 'Home'} />
          <NavLink to="/brands" text={language === 'es' ? 'Marcas' : 'Brands'} />
          <NavLink to="/ListVehicles" text={language === 'es' ? 'Vehículos' : 'Vehicles'} />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 text-black dark:text-white">
        <IconButton
          icon={Heart}
          ariaLabel={language === 'es' ? 'Favoritos' : 'Favorites'}
          to="/favorites"  // <- Cambiar onClick por to
        />

        <IconButton
          icon={Send}
          ariaLabel={language === 'es' ? 'Contacto' : 'Contact'}
          to="/contact"  // <- Cambiar onClick por to
        />

          {/* Settings Menu */}
          <div className="relative settings-menu">
            <IconButton
              icon={Settings}
              ariaLabel={language === 'es' ? 'Configuración' : 'Settings'}
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-gray-700/10 dark:bg-gray-800 hover:bg-gray-700/20"
            />
            
            {menuOpen && (
              <div 
                className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-2 z-50"
                role="menu"
              >
                <div className="flex flex-col gap-1">
                  <IconButton
                    icon={isDarkMode ? Sun : Moon}
                    ariaLabel={isDarkMode ? 'Modo claro' : 'Modo oscuro'}
                    onClick={toggleDarkMode}
                    className="justify-items-center "
                  />
                  
                  <button
                    onClick={toggleLanguage}
                    className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    aria-label={language === 'es' ? 'Cambiar idioma' : 'Change language'}
                  >
                    {language === 'es' ? 'EN' : 'ES'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <div className="relative">
            <CartDropdown />
            {getItemCount() > 0 && (
              <span 
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full"
                aria-live="polite"
              >
                {getItemCount()}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}