import { useState, useRef,useEffect  } from "react";
import { ChevronRight, Play } from "lucide-react";

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Función para reproducir el video
  const handleWatchFilm = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play(); // Asegura que el video comience a reproducirse
    }
  };

  // Función para detener el video
  const handleStopFilm = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause(); // Detiene el video
      videoRef.current.currentTime = 0; // Resetea el video a su inicio
    }
  };
  useEffect(() => {
    if (videoRef.current) {
      // Establecer el volumen al 50% (valor entre 0 y 1)
      videoRef.current.volume = 0.3; // Volumen del 50%
    }
  }, []);

  return (
    <section className="h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src="/videohero.mp4"
          className="w-full h-full object-cover"
          disablePictureInPicture
          loop
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />

        {/* Botón para detener el video */}
        {isPlaying && (
          <button
            onClick={handleStopFilm}
            className="bg-gray-600 opacity-30 text-white px-8 py-3 rounded-md z-50 absolute bottom-20 left-1/2 transform -translate-x-1/2"
          >
            Stop
          </button>
        )}
      </div>

      {/* Contenido encima de la imagen o video */}
      {!isPlaying && (
        <div className="relative mx-auto h-full flex flex-col justify-center md:px-40 z-10">
          <div className="py-20 px-4">
            <h1 className="text-6xl font-bold mb-4 text-white">BMW M4 CSL</h1>
            <p className="text-xl mb-8 text-gray-300">
              Competition. Sport. Lightweight.
            </p>
            <div className="flex space-x-4">
              <button className="bg-bmw-blue text-white px-8 py-3 rounded-md flex items-center">
                Configure Now <ChevronRight className="ml-2" />
              </button>
              <button
                onClick={handleWatchFilm}
                className="border border-white px-8 py-3 rounded-md flex items-center hover:bg-white/10 transition"
              >
                Watch Film <Play className="ml-2" />
              </button>
            </div>
          </div>
          {/* Imagen al fondo */}
          <div className="absolute inset-0 -z-50">
            <img
              src="https://mediapool.bmwgroup.com/cache/P9/202205/P90461734/P90461734-the-new-bmw-m4-csl-on-the-racetrack-05-2022-2250px.jpg"
              alt="Hero Image"
              className="w-full h-full object-cover" // Imagen con opacidad para que el texto se vea
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          </div>
        </div>
      )}
    </section>
  );
}
