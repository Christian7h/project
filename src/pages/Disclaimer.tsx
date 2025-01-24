import { useLanguage } from "../context/LanguageContext"; // Importar el contexto del idioma

export default function Disclaimer() {
  const { language } = useLanguage(); // Obtener el idioma actual

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center py-24">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          {language === "es" ? "Aviso Legal" : "Disclaimer"}
        </h1>
        {language === "es" ? (
          <>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              El contenido mostrado en este sitio web, incluidos pero no limitados a marcas, modelos, precios, descripciones e imágenes, se proporciona con fines creativos e ilustrativos únicamente.
              Este sitio web no está afiliado, respaldado ni asociado oficialmente con ninguna de las marcas o empresas mencionadas.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Todas las marcas registradas, logotipos, nombres de marcas e imágenes son propiedad de sus respectivos dueños. El uso de estos nombres, logotipos, marcas e imágenes no implica ningún respaldo, asociación o afiliación. 
              Las imágenes de vehículos y otros productos se utilizan únicamente para mejorar la experiencia visual y del usuario en esta plataforma.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Los precios, descripciones y detalles mostrados en este sitio web son ficticios y no representan las condiciones reales del mercado. Se utilizan únicamente con fines ilustrativos y no reflejan ofertas del mundo real.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Este sitio web es un proyecto sin fines de lucro y no está destinado a generar ingresos. Cualquier semejanza con productos reales, precios o entidades es pura coincidencia.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Si usted es representante de una marca, empresa o titular de derechos de autor y tiene inquietudes sobre el uso de su propiedad intelectual, marcas registradas o imágenes en este sitio web, por favor contáctenos a 
              <a href="mailto:cristianvillalobos666@gmail.com" className="text-bmw-blue hover:underline"> cristianvillalobos666@gmail.com</a>. Revisaremos y abordaremos su solicitud de inmediato.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Gracias por su comprensión y cooperación.
            </p>
          </>
        ) : (
          <>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              The content displayed on this website, including but not limited to brands, models, prices, descriptions, and images, is provided for creative and illustrative purposes only. 
              This website is not affiliated with, endorsed by, or officially associated with any of the brands or companies mentioned.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              All trademarks, logos, brand names, and images are the property of their respective owners. The use of these names, logos, brands, and images does not imply any endorsement, partnership, or affiliation. 
              Images of vehicles and other products are used solely to enhance the visual and user experience on this platform.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              The prices, descriptions, and details shown on this website are fictional and not representative of actual market conditions. They are intended for illustrative purposes only and do not reflect real-world offers.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              This website is a non-commercial project and is not intended for generating profits. Any resemblance to real products, prices, or entities is purely coincidental.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              If you are a representative of a brand, company, or copyright holder and have concerns regarding the use of your intellectual property, trademarks, or images on this website, please contact us at 
              <a href="mailto:cristianvillalobos666@gmail.com" className="text-bmw-blue hover:underline"> cristianvillalobos666@gmail.com</a>. We will promptly review and address your request.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Thank you for your understanding and cooperation.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
