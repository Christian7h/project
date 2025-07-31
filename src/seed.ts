import axios from 'axios';
import { vehicles, brands } from './data';

const BASE_URL = 'https://project-d61.pages.dev';

async function getBrandIdMap(): Promise<Record<string, string>> {
  const map: Record<string, string> = {};
  try {
    // Supongamos que tu API tiene un endpoint para traer todas las marcas
    const res = await axios.get('http://localhost:3000/api/v1/brands');
    const allBrands = res.data.data; // Ajusta según respuesta real

    for (const brand of brands) {
      const found = allBrands.find((b: any) => b.name.toLowerCase() === brand.name.toLowerCase());
      if (found) {
        map[brand.id] = found._id;
      } else {
        console.warn(`⚠️ Marca no encontrada en la BD: ${brand.name}`);
      }
    }
  } catch (error) {
    console.error('Error obteniendo marcas:', error);
  }
  return map;
}

async function seedVehicles() {
  const brandMap = await getBrandIdMap();

  for (const vehicle of vehicles) {
    const brandId = brandMap[vehicle.brandId];
    if (!brandId) {
      console.error(`❌ Marca no encontrada para "${vehicle.brandId}"`);
      continue;
    }

    const payload = {
      brandId,
      name: vehicle.name,
      image: `${BASE_URL}${vehicle.image.startsWith('/') ? vehicle.image : '/' + vehicle.image}`,
      images: vehicle.images.map(img => `${BASE_URL}${img.startsWith('/') ? img : '/' + img}`),
      price: vehicle.price,
      description: vehicle.description,
      year: vehicle.year,
      type: vehicle.type,
      specs: vehicle.specs,
      stock: vehicle.stock,
      translations: vehicle.translations,
      available: vehicle.stock > 0, // Si tu backend no lo calcula automáticamente
    };

    try {
      await axios.post('http://localhost:3000/api/v1/vehicles', payload);
      console.log(`✅ Vehículo insertado: ${vehicle.name}`);
    } catch (error: any) {
      console.error(`❌ Error al insertar ${vehicle.name}:`, error.response?.data || error.message);
    }
  }
}

seedVehicles();
