import React from "react";
import { useParams } from "react-router-dom";
import { vehicles } from "../data";
import { Car, Clock3, Settings } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function VehicleDetail() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const vehicle = vehicles.find((v) => v.id === vehicleId);

  if (!vehicle) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4">
        <div className="gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Imagen */}
            <div>
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full rounded-lg"
              />
            </div>

            {/* Detalles */}
            <div className="space-y-8">
              <h1 className="text-4xl font-bold mb-4">{vehicle.name}</h1>
              <p className="text-2xl text-bmw-blue mb-6">{vehicle.price}</p>
              <p className="text-gray-400 mb-8">{vehicle.description}</p>

              {/* Especificaciones */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-zinc-900 p-6 rounded-lg text-center hover:scale-105 transition duration-500">
                  <Settings className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-bold">{vehicle.specs.power}</p>
                  <p className="text-sm text-gray-400">Power</p>
                </div>
                <div className="bg-zinc-900 p-6 rounded-lg text-center hover:scale-105 transition duration-500">
                  <Clock3 className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-bold">{vehicle.specs.acceleration}</p>
                  <p className="text-sm text-gray-400">0-60 mph</p>
                </div>
                <div className="bg-zinc-900 p-6 rounded-lg text-center hover:scale-105 transition duration-500">
                  <Car className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-bold">{vehicle.specs.topSpeed}</p>
                  <p className="text-sm text-gray-400">Top Speed</p>
                </div>
              </div>

              {/* Botón */}
                <button className="w-full bg-bmw-blue text-white py-3 rounded-lg mt-8 hover:bg-bmw-blue/90 transition ">
                Programar prueba de manejo
                </button>
            </div>
          </div>

          <div className="col-span-2">
            <h2 className="text-3xl font-bold py-5">Galeria</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
              {vehicle.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={vehicle.name}
                  className="w-full rounded-lg hover:scale-105 transition duration-500"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
