import { useState } from "react";
import { Mail, User, Send } from "lucide-react";
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };
  const { language} = useLanguage(); 

  return (
<div>
  <section
    id="contact"
    className="h-screen flex items-center justify-center bg-white dark:bg-black relative overflow-hidden"
  >
    {/* Contenido Principal */}
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-gray-900 p-8 rounded-xl shadow-lg">
      <h2 className="text-4xl font-bold mb-8 text-center text-black dark:text-white">
          {language === 'es' ? 'Contáctanos' : 'Contact Us'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
          {language === 'es'
            ? '¿Tienes preguntas o comentarios? Envíanos un mensaje y te responderemos pronto.'
            : 'Have questions or feedback? Send us a message, and we’ll get back to you!'}
        </p>
        {isSubmitted ? (
          <div className="text-center text-lg font-semibold text-bmw-blue animate-pulse">
            {language === 'es'
              ? '¡Gracias! Tu mensaje ha sido enviado.'
              : 'Thank you! Your message has been sent.'}
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <User className="absolute left-4 top-3 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full bg-white dark:bg-black rounded-md pl-12 pr-4 py-3 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-bmw-blue"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-3 text-gray-400 dark:text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full bg-white dark:bg-black rounded-md pl-12 pr-4 py-3 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-bmw-blue"
              />
            </div>
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows={4}
                required
                className="w-full bg-white dark:bg-gray-800 rounded-md px-4 py-3 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-bmw-blue"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-bmw-blue text-white py-3 rounded-md hover:bg-bmw-blue/90 transition-transform transform hover:scale-105"
            >
                        {language === 'es'
            ? 'Enviar Mensaje'
            : 'Send Message'} <Send className="ml-2" />
            </button>
          </form>
        )}
      </div>
    </div>
  </section>
</div>


  );
}
