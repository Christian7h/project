import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-bmw-blue">
          Auto Showcase
        </Link>
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-bmw-blue transition">Home</Link>
          <Link to="/brands" className="hover:text-bmw-blue transition">Brands</Link>
          <a href="#contact" className="hover:text-bmw-blue transition">Contact</a>
        </div>
        <button className="bg-bmw-blue text-white px-6 py-2 rounded hover:bg-bmw-blue/90 transition">
          Test Drive
        </button>
      </div>
    </nav>
  );
}