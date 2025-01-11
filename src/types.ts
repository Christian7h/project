export interface Brand {
  id: string;
  name: string;
    // Nombre de la marca (este podría ser dinámico por idioma)
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
  year?: number; // Año de fabricación del vehículo
  type?: string; // Tipo de vehículo (e.g., SUV, Sedan, Hatchback)
  specs: {
    power: string;
    acceleration: string;
    topSpeed: string;
  };
  stock: number;
  translations?: { [key: string]: { name: string; description: string,type?:string } };  // Traducciones opcionales
}

export interface CartItem {
  vehicleId: string;
  quantity: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  customerInfo: CustomerInfo;
  items: CartItem[];
}

export interface WebpayResponse {
  token: string;
  url: string;
}

// src/types.ts
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
}