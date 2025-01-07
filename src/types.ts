export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export interface Vehicle {
  id: string;
  brandId: string;
  name: string;
  image: string;
  images: string[];
  price: string;
  description: string;
  specs: {
    power: string;
    acceleration: string;
    topSpeed: string;
  };
}