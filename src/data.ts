import { Brand, Vehicle } from './types';

export const brands: Brand[] = [
  {
    id: 'bmw',
    name: 'BMW',
    logo: '/bmw/bmw.png',
    description: 'The Ultimate Driving Machine'
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    logo: '/mb.png',
    description: 'The Best or Nothing'
  },
  {
    id: 'audi',
    name: 'Audi',
    logo: '/audi.png',
    description: 'Progress through Technology'
  },
  {
    id: 'porsche',
    name: 'Porsche',
    logo: '/porche.png',
    description: 'There is no substitute',
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    logo: '/ferrari.png',
    description: 'We build cars'
  },
  {
    id: 'lamborghini',
    name: 'Lamborghini',
    logo: 'lambo.png',
    description: 'We build',
  },
  {
    id: 'bugatti',
    name: 'Bugatti',
    logo: 'buga.png',
    description: 'We build cars',
  },

  {
    id: 'koenigsegg',
    name: 'Koenigsegg',
    logo: 'koeni.png',
    description: 'We build cars',
  }
];

export const vehicles: Vehicle[] = [
  {
    id: 'm4-csl',
    brandId: 'bmw',
    name: 'BMW M4 CSL',
    image: '/bmw/bmwm4cls.png',
    images: ['/bmw/bmwm4cls (20).jpg',
             '/bmw/bmwm4cls (19).jpg', '/bmw/bmwm4cls (18).jpg', 
             '/bmw/bmwm4cls (17).jpg', '/bmw/bmwm4cls (16).jpg', 
             '/bmw/bmwm4cls (15).jpg', '/bmw/bmwm4cls (14).jpg',
              '/bmw/bmwm4cls (13).jpg', '/bmw/bmwm4cls (12).jpg',
              '/bmw/bmwm4cls (11).jpg', '/bmw/bmwm4cls (10).jpg',
              '/bmw/bmwm4cls (9).jpg', '/bmw/bmwm4cls (8).jpg',
              '/bmw/bmwm4cls (7).jpg', '/bmw/bmwm4cls (6).jpg',
              '/bmw/bmwm4cls (5).jpg', '/bmw/bmwm4cls (4).jpg',
              '/bmw/bmwm4cls (3).jpg', '/bmw/bmwm4cls (2).jpg',
              '/bmw/bmwm4cls (1).jpg'
            ],
    price: '$139,900',
    description: 'Competition. Sport. Lightweight.',
    specs: {
      power: '550 HP',
      acceleration: '3.6s',
      topSpeed: '191 mph'
    }
  },
  {
    id: 'm5-cs',
    brandId: 'bmw',
    name: 'BMW M5 CS',
    image: 'https://images.unsplash.com/photo-1683644977583-5c18af1cd3cd',
    images: ['/bmwm4cls.png', '/bmwm4cls2.png', '/bmwm4cls3.png'],
    price: '$142,000',
    description: 'The most powerful M car ever.',
    specs: {
      power: '627 HP',
      acceleration: '2.9s',
      topSpeed: '190 mph'
    }
  },
  {
    id: 'm8-competition',
    brandId: 'bmw',
    name: 'BMW M8 Competition',
    image: 'https://images.unsplash.com/photo-1683644977583-5c18af1cd3cd',
    images: ['/bmwm4cls.png', '/bmwm4cls2.png', '/bmwm4cls3.png'],
    price: '$146,000',
    description: 'The Ultimate Driving Machine',
    specs: {
      power: '617 HP',
      acceleration: '3.0s',
      topSpeed: '190 mph'
    }
  }
];