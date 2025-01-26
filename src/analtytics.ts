// src/analytics.ts
export const initializeGA = (measurementId: string) => {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }
  
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
  
    // Agrega el script de Google Analytics al head si no existe
    if (!document.querySelector(`script[src="https://www.googletagmanager.com/gtag/js?id=G-DWNH2G6WXW"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=G-DWNH2G6WXW`;
      document.head.appendChild(script);
    }
  
    // Configura Google Analytics
    gtag("js", new Date());
    gtag("config", measurementId);
  
    // Devuelve la función gtag para usarla
    return gtag;
  };
  