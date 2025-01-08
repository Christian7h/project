import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definir los tipos para el contexto de idioma
interface LanguageContextType {
  language: string;
  toggleLanguage: () => void;
}

// Crear el contexto con un valor por defecto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Proveedor del contexto
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>('en'); // 'en' por defecto

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en'); // Cambia entre inglés (en) y español (es)
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para usar el contexto en cualquier componente
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
