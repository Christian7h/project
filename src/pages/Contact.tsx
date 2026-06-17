import { useState } from "react";
import { Mail, User, Send, Phone, MapPin, MessageSquare, Instagram, Facebook, Twitter } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 5000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: language === 'es' ? 'Llámanos' : 'Call Us',
      content: '+56 9 1234 5678',
      subContent: language === 'es' ? 'Lun - Vie, 9am - 7pm' : 'Mon - Fri, 9am - 7pm',
    },
    {
      icon: Mail,
      title: language === 'es' ? 'Escríbenos' : 'Email Us',
      content: 'info@luxurymotors.com',
      subContent: language === 'es' ? 'Respuesta en 24h' : 'Response within 24h',
    },
    {
      icon: MapPin,
      title: language === 'es' ? 'Visítanos' : 'Visit Us',
      content: 'Av. Las Condes 12345',
      subContent: 'Vitacura, Santiago, Chile',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-24 pb-12 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-bmw-blue/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6"
          >
            {language === "es" ? "Hablemos de tu Próximo " : "Let's Talk About Your Next "}<span className="text-bmw-blue">{language === 'es' ? 'Lujo' : 'Luxury'}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 dark:text-zinc-400 text-lg"
          >
            {language === "es"
              ? "Nuestro equipo de expertos está listo para brindarte una asesoría personalizada y exclusiva. Vive la experiencia Luxury Motors."
              : "Our team of experts is ready to provide you with personalized and exclusive advice. Experience Luxury Motors."}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-zinc-50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-3xl hover:border-bmw-blue/50 transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-bmw-blue/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-bmw-blue group-hover:text-white transition-colors duration-500">
                    <info.icon className="w-6 h-6 text-bmw-blue group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-1">{info.title}</h4>
                    <p className="text-xl font-bold text-zinc-900 dark:text-white mb-1">{info.content}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{info.subContent}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social Connect */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-8 bg-zinc-900 text-white rounded-3xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-bmw-blue opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <h4 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6">{language === 'es' ? 'Siguenos' : 'Follow Us'}</h4>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 bg-white/10 hover:bg-bmw-blue rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl dark:shadow-none border border-zinc-100 dark:border-zinc-800 relative"
          >
            <AnimatePresence>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-zinc-900 rounded-[2.5rem] z-20"
                >
                  <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <Send className="w-10 h-10" />
                    </motion.div>
                  </div>
                  <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
                    {language === "es" ? "¡Mensaje Enviado!" : "Message Sent!"}
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    {language === "es"
                      ? "Gracias por contactarnos. Un especialista se pondrá en contacto contigo muy pronto."
                      : "Thank you for contacting us. A specialist will get in touch with you very soon."}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider ml-1">{language === 'es' ? 'Nombre' : 'Name'}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
                      className="w-full pl-12 pr-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-bmw-blue dark:text-white transition-all outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider ml-1">{language === 'es' ? 'Email' : 'Email'}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full pl-12 pr-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-bmw-blue dark:text-white transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider ml-1">{language === 'es' ? 'Asunto' : 'Subject'}</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    required
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={language === 'es' ? '¿En qué podemos ayudarte?' : 'How can we help?'}
                    className="w-full pl-12 pr-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-bmw-blue dark:text-white transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider ml-1">{language === 'es' ? 'Mensaje' : 'Message'}</label>
                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder={language === 'es' ? 'Escribe tu mensaje aquí...' : 'Write your message here...'}
                  className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-bmw-blue dark:text-white transition-all outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-bmw-blue text-white rounded-2xl font-bold text-lg shadow-xl shadow-bmw-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                {language === 'es' ? 'Enviar Solicitud' : 'Send Inquiry'}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Map Placeholder Area */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 rounded-[3rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 h-[400px] relative border border-zinc-200 dark:border-zinc-800"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-xl mb-4 mx-auto">
                <MapPin className="w-8 h-8 text-bmw-blue" />
              </div>
              <h3 className="text-xl font-bold dark:text-white mb-2">Luxury Motors Vitacura</h3>
              <p className="text-zinc-500 max-w-sm">Av. Las Condes 12345, Vitacura, Región Metropolitana, Chile</p>
              <button className="mt-6 px-6 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-bold dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
                {language === 'es' ? 'Ver en Google Maps' : 'View on Google Maps'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
