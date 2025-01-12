import { Instagram, Facebook, Youtube, Twitter, Home, Trello, UserCircle2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-white dark:bg-black py-12">
      <div className="container mx-auto px-4">
        {/* Social Media Links */}
        <div className="flex justify-center text-black dark:text-white space-x-6 mb-8">
          <Instagram className="w-6 h-6 hover:text-bmw-blue cursor-pointer transition" />
          <Facebook className="w-6 h-6 hover:text-bmw-blue cursor-pointer transition" />
          <Youtube className="w-6 h-6 hover:text-bmw-blue cursor-pointer transition" />
          <Twitter className="w-6 h-6 hover:text-bmw-blue cursor-pointer transition" />
          <Link to="/">
            <Home className="w-6 h-6 hover:text-bmw-blue cursor-pointer transition" />
          </Link>
          <Link to="/brands">
            <Trello className="w-6 h-6 hover:text-bmw-blue cursor-pointer transition" />
          </Link>
          <Link to="/contact">
            <UserCircle2Icon className="w-6 h-6 hover:text-bmw-blue cursor-pointer transition" />
          </Link>
        </div>
          {/* Footer Text */}
        <p className="text-center text-gray-400 mb-4">
          {language === "es"
            ? "Este sitio web es un proyecto ilustrativo. Para más información, consulta el aviso legal."
            : "This website is an illustrative project. For more information, see the disclaimer."}
        </p>

        {/* Disclaimer Link */}
        <p className="text-center text-gray-400">
          <Link
            to="/disclaimer"
            className="hover:underline text-gray-500 dark:text-gray-400"
          >
            {language === "es"
              ? "Aviso Legal / Descargo de Responsabilidad"
              : "Legal Notice / Disclaimer"}
          </Link>
        </p>
      </div>
    </footer>
  );
}
