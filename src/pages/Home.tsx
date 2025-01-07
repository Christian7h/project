import { Link } from "react-router-dom";
import { brands } from "../data";
import { ChevronRight, Play } from "lucide-react";
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Featured Brands Section */}
      <section className="h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://mediapool.bmwgroup.com/cache/P9/202205/P90461734/P90461734-the-new-bmw-m4-csl-on-the-racetrack-05-2022-2250px.jpg"
            alt="BMW M4 CSL"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>
        <div className="relative h-full flex items-center container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold mb-4">BMW M4 CSL</h1>
            <p className="text-xl mb-8">Competition. Sport. Lightweight.</p>
            <div className="flex space-x-4">
              <button className="bg-bmw-blue text-white px-8 py-3 rounded-md flex items-center">
                Configure Now <ChevronRight className="ml-2" />
              </button>
              <button className="border border-white px-8 py-3 rounded-md flex items-center hover:bg-white/10 transition">
                Watch Film <Play className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Featured Brands
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                to={`/brands/${brand.id}`}
                className="group bg-zinc-900 p-8 rounded-lg text-center transition-transform hover:-translate-y-2"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-32 h-32 mx-auto mb-4 object-contain"
                />
                <h3 className="text-2xl font-bold mb-2">{brand.name}</h3>
                <p className="text-gray-400">{brand.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
