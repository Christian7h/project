import { useState, useRef, useEffect } from "react";
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

  // Función para pausar o reanudar el video
  const handlePausePlayFilm = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play(); // Reanuda la reproducción si está en pausa
      } else {
        videoRef.current.pause(); // Pausa el video si está reproduciéndose
      }
    }
  };

  // Función para adelantar el video 10 segundos
  const handleForward10Sec = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10; // Adelanta el video 10 segundos
    }
  };

  // Función para retroceder el video 10 segundos
  const handleBackward10Sec = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10; // Retrocede el video 10 segundos
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      // Establecer el volumen al 50% (valor entre 0 y 1)
      videoRef.current.volume = 0.3; // Volumen del 30%
    }

    // Configurar el Intersection Observer para detectar cuando el video sale del viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // El video ha salido del viewport, detenerlo
            if (videoRef.current) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: 0.5, // El video debe estar al menos un 50% visible para ser considerado
      }
    );

    // Comenzar a observar el video
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    // Limpiar el observador cuando el componente se desmonte
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
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

        {/* Botones para controlar el video */}
        {isPlaying && (
          <div className="z-50 absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button
              onClick={handleStopFilm}
              className="bg-gray-600 opacity-30 text-white px-8 py-3 rounded-md"
            >
              Stop
            </button>
            <button
              onClick={handlePausePlayFilm}
              className="bg-yellow-600 text-white px-8 py-3 rounded-md opacity-30"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              onClick={handleBackward10Sec}
              className="bg-blue-600 text-white px-8 py-3 rounded-md opacity-30"
            >
              -10 Sec
            </button>
            <button
              onClick={handleForward10Sec}
              className="bg-green-600 text-white px-8 py-3 rounded-md opacity-30"
            >
              +10 Sec
            </button>
          </div>
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
