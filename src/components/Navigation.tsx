import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navigation({ isDarkMode, toggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);

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
            Home
          </Link>
          <Link
            to="/brands"
            className="hover:text-bmw-blue dark:hover:text-bmw-blue transition"
          >
            Brands
          </Link>
          <Link
            to="/contact"
            className="hover:text-bmw-blue dark:hover:text-bmw-blue transition"
          >
            Contact
          </Link>
        </div>

        {/* Botones */}
        <div className="flex items-center space-x-4">
          <button
            className="bg-bmw-blue text-white px-6 py-2 rounded hover:bg-bmw-blue/90 transition"
            aria-label="Schedule a test drive"
          >
            Test Drive
          </button>
          <button
            onClick={toggleDarkMode}
            className="text-white bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            {isDarkMode ? "Dark" : "Light"}
          </button>
        </div>
      </div>
    </nav>
  );
}
