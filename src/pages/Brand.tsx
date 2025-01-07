import { brands } from "../data";
import { Link } from "react-router-dom";

export default function Brand() {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-4">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Marcas Destacadas
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
    </div>
  );
}
