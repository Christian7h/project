export interface Brand {
  id: string;
  name: string;  // Nombre de la marca (este podría ser dinámico por idioma)
  logo: string;
  description: string;  // Descripción de la marca (también podría ser dinámica por idioma)
  translations?: { [key: string]: { name: string; description: string } }; // Traducciones opcionales
}

export interface Vehicle {
  id: string;
  brandId: string;  // Relaciona el vehículo con la marca
  name: string;  // Nombre del vehículo
  image: string;
  images: string[];  // Galería de imágenes
  price: string;  // Precio
  description: string;  // Descripción del vehículo
  specs: {
    power: string;
    acceleration: string;
    topSpeed: string;
  };
  translations?: { [key: string]: { name: string; description: string } };  // Traducciones opcionales
}
