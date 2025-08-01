import { Instagram, Facebook, Youtube, Twitter, Home, Trello, UserCircle2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="relative py-24 bg-gradient-to-tr from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      {/* Decorative top border */}
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-gray-400/20 dark:border-white/10 rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-gray-400/20 dark:border-white/10 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-gray-400/20 dark:border-white/10 rounded-full"></div>
        <div className="absolute bottom-10 right-1/3 w-20 h-20 border border-gray-400/20 dark:border-white/10 rounded-full"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="text-center md:text-left text-gray-900 dark:text-white">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-bmw-blue to-bmw-lightblue rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Luxury Cars</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4">
              {language === "es"
                ? "La experiencia definitiva en vehículos de lujo. Descubre la excelencia en cada detalle."
                : "The ultimate luxury vehicle experience. Discover excellence in every detail."}
            </p>
            <div className="flex justify-center md:justify-start gap-2">
              <div className="w-2 h-2 bg-bmw-blue rounded-full"></div>
              <div className="w-2 h-2 bg-bmw-lightblue rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center text-gray-900 dark:text-white">
            <h4 className="text-xl font-bold mb-6 text-bmw-blue dark:text-bmw-lightblue">
              {language === "es" ? "Enlaces Rápidos" : "Quick Links"}
            </h4>
            <div className="space-y-3">
              <Link to="/" className="block group">
                <div className="flex items-center justify-center gap-3 py-2 px-4 rounded-lg hover:bg-gray-200/50 dark:hover:bg-white/10 transition-all duration-300">
                  <Home className="w-5 h-5 text-bmw-blue group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-bmw-blue dark:group-hover:text-bmw-lightblue transition-colors">
                    {language === "es" ? "Inicio" : "Home"}
                  </span>
                </div>
              </Link>
              <Link to="/brands" className="block group">
                <div className="flex items-center justify-center gap-3 py-2 px-4 rounded-lg hover:bg-gray-200/50 dark:hover:bg-white/10 transition-all duration-300">
                  <Trello className="w-5 h-5 text-bmw-blue group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-bmw-blue dark:group-hover:text-bmw-lightblue transition-colors">
                    {language === "es" ? "Marcas" : "Brands"}
                  </span>
                </div>
              </Link>
              <Link to="/contact" className="block group">
                <div className="flex items-center justify-center gap-3 py-2 px-4 rounded-lg hover:bg-gray-200/50 dark:hover:bg-white/10 transition-all duration-300">
                  <UserCircle2Icon className="w-5 h-5 text-bmw-blue group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-bmw-blue dark:group-hover:text-bmw-lightblue transition-colors">
                    {language === "es" ? "Contacto" : "Contact"}
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Social Media & Connect */}
          <div className="text-center text-gray-900 dark:text-white">
            <h4 className="text-xl font-bold mb-6 text-bmw-blue dark:text-bmw-lightblue">
              {language === "es" ? "Conecta con Nosotros" : "Connect With Us"}
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <a href="#" className="group flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-pink-500/10 to-pink-600/10 dark:from-pink-500/20 dark:to-pink-600/20 rounded-lg hover:from-pink-500/20 hover:to-pink-600/20 dark:hover:from-pink-500/30 dark:hover:to-pink-600/30 transition-all duration-300 border border-pink-500/20 hover:border-pink-500/40">
                <Instagram className="w-5 h-5 text-pink-500 dark:text-pink-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Instagram</span>
              </a>
              <a href="#" className="group flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20 rounded-lg hover:from-blue-500/20 hover:to-blue-600/20 dark:hover:from-blue-500/30 dark:hover:to-blue-600/30 transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40">
                <Facebook className="w-5 h-5 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Facebook</span>
              </a>
              <a href="#" className="group flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-red-500/10 to-red-600/10 dark:from-red-500/20 dark:to-red-600/20 rounded-lg hover:from-red-500/20 hover:to-red-600/20 dark:hover:from-red-500/30 dark:hover:to-red-600/30 transition-all duration-300 border border-red-500/20 hover:border-red-500/40">
                <Youtube className="w-5 h-5 text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm">YouTube</span>
              </a>
              <a href="#" className="group flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-sky-500/10 to-sky-600/10 dark:from-sky-500/20 dark:to-sky-600/20 rounded-lg hover:from-sky-500/20 hover:to-sky-600/20 dark:hover:from-sky-500/30 dark:hover:to-sky-600/30 transition-all duration-300 border border-sky-500/20 hover:border-sky-500/40">
                <Twitter className="w-5 h-5 text-sky-500 dark:text-sky-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-r from-bmw-blue to-bmw-blue px-6 py-2 rounded-full shadow-lg">
              <div className="w-4 h-4 bg-white/50 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center space-y-4">
          {/* Disclaimer Text */}
          <div className="bg-gradient-to-r from-gray-200/80 to-gray-300/80 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-300/50 dark:border-gray-700/30 shadow-lg">
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4 leading-relaxed">
              {language === "es"
                ? "Este sitio web es un proyecto ilustrativo diseñado para demostrar habilidades de desarrollo. Todas las imágenes y contenidos son utilizados únicamente con fines educativos."
                : "This website is an illustrative project designed to showcase development skills. All images and content are used for educational purposes only."}
            </p>
            
            {/* Disclaimer Link */}
            <Link
              to="/disclaimer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-bmw-blue to-bmw-lightblue text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {language === "es"
                ? "Aviso Legal Completo"
                : "Full Legal Notice"}
            </Link>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-300 dark:border-gray-700/30">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2025 Luxury Cars. {language === "es" ? "Proyecto Educativo" : "Educational Project"}.
            </p>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm">
              <span>{language === "es" ? "Hecho con" : "Made with"}</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-red-500 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span>{language === "es" ? "y React" : "and React"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
