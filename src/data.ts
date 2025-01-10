//src/data.ts
import { Brand, Vehicle } from './types';
// const translations = {
//   en: {
//     bmw: { name: 'BMW', description: 'The Ultimate Driving Machine' },
//     mercedes: { name: 'Mercedes-Benz', description: 'The Best or Nothing' },
//     audi: { name: 'Audi', description: 'Progress through Technology' },
//     porsche: { name: 'Porsche', description: 'There is no substitute' },
//     ferrari: { name: 'Ferrari', description: 'We build cars' },
//     lamborghini: { name: 'Lamborghini', description: 'We build' },
//     bugatti: { name: 'Bugatti', description: 'We build cars' },
//     koenigsegg: { name: 'Koenigsegg', description: 'We build cars' },
//   },
//   es: {
//     bmw: { name: 'BMW', description: 'La Máxima Máquina de Conducción' },
//     mercedes: { name: 'Mercedes-Benz', description: 'Lo Mejor o Nada' },
//     audi: { name: 'Audi', description: 'Progreso a través de la Tecnología' },
//     porsche: { name: 'Porsche', description: 'No hay sustituto' },
//     ferrari: { name: 'Ferrari', description: 'Construimos autos' },
//     lamborghini: { name: 'Lamborghini', description: 'Construimos' },
//     bugatti: { name: 'Bugatti', description: 'Construimos autos' },
//     koenigsegg: { name: 'Koenigsegg', description: 'Construimos autos' },
//   },
// };

export const brands: Brand[] = [
  {
    id: 'bmw',
    name: 'BMW',
    logo: '/bmw/bmw.png',
    description: 'The Ultimate Driving Machine',
    translations: {
      es: {
        name: 'BMW',
        description: 'La máquina de conducir definitiva',
      },
      en: {
        name: 'BMW',
        description: 'The Ultimate Driving Machine',
      }
    }
  },
  {
    id: 'mercedes',
    name: 'Mercedes-Benz',
    logo: '/mb/mb.png',
    description: 'The Best or Nothing',
    translations: {
      es: {
        name: 'Mercedes-Benz',
        description: 'Lo mejor o nada',
      },
      en: {
        name: 'Mercedes-Benz',
        description: 'The Best or Nothing',
      }
    }
  },
  {
    id: 'audi',
    name: 'Audi',
    logo: '/audi/audi.png',
    description: 'Progress through Technology',
    translations: {
      es: {
        name: 'Audi',
        description: 'Progreso a través de la tecnología',
      },
      en: {
        name: 'Audi',
        description: 'Progress through Technology',
      }
    }
  },
  {
    id: 'porsche',
    name: 'Porsche',
    logo: '/por/por.png',
    description: 'There is no substitute',
    translations: {
      es: {
        name: 'Porsche',
        description: 'No hay sustituto',
      },
      en: {
        name: 'Porsche',
        description: 'There is no substitute',
      }
    }
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    logo: '/fer/fer.png',
    description: 'We build cars',
    translations: {
      es: {
        name: 'Ferrari',
        description: 'Construimos autos',
      },
      en: {
        name: 'Ferrari',
        description: 'We build cars',
      }
    }
  },
  {
    id: 'lamborghini',
    name: 'Lamborghini',
    logo: '/lambo/lambo.png',
    description: 'We build luxury cars',
    translations: {
      es: {
        name: 'Lamborghini',
        description: 'Fabricamos autos de lujo',
      },
      en: {
        name: 'Lamborghini',
        description: 'We build luxury cars',
      },
    }
  },
  {
    id: 'bugatti',
    name: 'Bugatti',
    logo: '/buga/buga.png',
    description: 'Construimos autos',
    translations: {
      es: {
        name: 'Bugatti',
        description: 'Construimos autos',
      },
      en: {
        name: 'Bugatti',
        description: 'We build cars',
      },
    }
  },

  {
    id: 'koenigsegg',
    name: 'Koenigsegg',
    logo: '/koeni/koeni.png',
    description: 'Construimos autos',
    translations: {
      es: {
        name: 'Koenigsegg',
        description: 'Construimos autos',
      },
      en: {
        name: 'Koenigsegg',
        description: 'We build cars',
      },
    }
  }
];

export const vehicles: Vehicle[] = [
  {
    id: 'm4-csl',
    brandId: 'bmw',
    name: 'BMW M4 CSL',
    image: '/bmw/m4cls/bmwm4cls (20).jpg',
    images: [
      '/bmw/m4cls/bmwm4cls (20).jpg', '/bmw/m4cls/bmwm4cls (19).jpg', '/bmw/m4cls/bmwm4cls (18).jpg',
      '/bmw/m4cls/bmwm4cls (17).jpg', '/bmw/m4cls/bmwm4cls (16).jpg', '/bmw/m4cls/bmwm4cls (15).jpg',
      '/bmw/m4cls/bmwm4cls (14).jpg', '/bmw/m4cls/bmwm4cls (13).jpg', '/bmw/m4cls/bmwm4cls (12).jpg',
      '/bmw/m4cls/bmwm4cls (11).jpg', '/bmw/m4cls/bmwm4cls (10).jpg', '/bmw/m4cls/bmwm4cls (9).jpg',
      '/bmw/m4cls/bmwm4cls (8).jpg', '/bmw/m4cls/bmwm4cls (7).jpg', '/bmw/m4cls/bmwm4cls (6).jpg',
      '/bmw/m4cls/bmwm4cls (5).jpg', '/bmw/m4cls/bmwm4cls (4).jpg', '/bmw/m4cls/bmwm4cls (3).jpg',
      '/bmw/m4cls/bmwm4cls (2).jpg', '/bmw/m4cls/bmwm4cls (1).jpg'
    ],
    price: '139900',
    description: 'Competition. Sport. Lightweight.',
    year: 2024,
    type: 'Coupe',
    specs: {
      power: '550 HP',
      acceleration: '3.6s',
      topSpeed: '191 mph'
    },
    stock: 14,
    translations: {
      es: {
        name: 'BMW M4 CSL',
        description: 'Competición. Deporte. Ligero.',
        type: 'Coupe',
      },
      en: {
        name: 'BMW M4 CSL',
        description: 'Competition. Sport. Lightweight.',
        type: 'Coupe'
      },
    },
  },
  {
    id: 'm5-cs',
    brandId: 'bmw',
    name: 'BMW M5 CS',
    image: '/bmw/m5cs/m5cs.jpg',
    images: ['/bmw/m5cs/bmwm5cs1.jpg', '/bmw/m5cs/bmwm5cs2.jpg', '/bmw/m5cs/bmwm5cs3.jpg', '/bmw/m5cs/bmwm5cs4.jpg',
      '/bmw/m5cs/bmwm5cs5.jpg', '/bmw/m5cs/bmwm5cs6.jpg', '/bmw/m5cs/bmwm5cs7.jpg', '/bmw/m5cs/bmwm5cs8.jpg',
      '/bmw/m5cs/bmwm5cs9.jpg', '/bmw/m5cs/bmwm5cs10.jpg', '/bmw/m5cs/bmwm5cs11.jpg', '/bmw/m5cs/bmwm5cs12.jpg',
      '/bmw/m5cs/bmwm5cs13.jpg', '/bmw/m5cs/bmwm5cs14.jpg', '/bmw/m5cs/bmwm5cs15.jpg', '/bmw/m5cs/bmwm5cs16.jpg',
      '/bmw/m5cs/bmwm5cs17.jpg', '/bmw/m5cs/bmwm5cs18.jpg', '/bmw/m5cs/bmwm5cs19.jpg', '/bmw/m5cs/bmwm5cs20.jpg',
      '/bmw/m5cs/bmwm5cs21.jpg', '/bmw/m5cs/bmwm5cs22.jpg', '/bmw/m5cs/bmwm5cs23.jpg', '/bmw/m5cs/bmwm5cs24.jpg',
      '/bmw/m5cs/bmwm5cs25.jpg', '/bmw/m5cs/bmwm5cs26.jpg', '/bmw/m5cs/bmwm5cs27.jpg', '/bmw/m5cs/bmwm5cs28.jpg',
      '/bmw/m5cs/bmwm5cs29.jpg', '/bmw/m5cs/bmwm5cs30.jpg', '/bmw/m5cs/bmwm5cs31.jpg', '/bmw/m5cs/bmwm5cs32.jpg',],
    price: '142000',
    description: 'The most powerful M car ever.',
    type: 'Sedan',
    year: 2025,
    specs: {
      power: '627 HP',
      acceleration: '2.9s',
      topSpeed: '190 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'BMW M5 CS',
        description: 'El coche M más potente de todos los tiempos.',
        type: 'Sedan'
      },
      en: {
        name: 'BMW M5 CS',
        description: 'The most powerful M car ever.',
        type: 'Sedan'
      },
    },
  },
  {
    id: 'm8-competition',
    brandId: 'bmw',
    name: 'BMW ALPINA B8',
    image: '/bmw/b8/1.jpg',
    images: ['/bmw/b8/1.jpg', '/bmw/b8/2.jpg', '/bmw/b8/3.jpg',
      '/bmw/b8/4.jpg', '/bmw/b8/5.jpg', '/bmw/b8/6.jpg', '/bmw/b8/7.jpg', '/bmw/b8/8.jpg',
      '/bmw/b8/9.jpg', '/bmw/b8/10.jpg', '/bmw/b8/11.jpg', '/bmw/b8/12.jpg', '/bmw/b8/13.jpg',
      '/bmw/b8/14.jpg', '/bmw/b8/15.jpg', '/bmw/b8/16.jpg', '/bmw/b8/17.jpg', '/bmw/b8/18.jpg',
      '/bmw/b8/19.jpg', '/bmw/b8/20.jpg', '/bmw/b8/21.jpg', '/bmw/b8/22.jpg', '/bmw/b8/23.jpg',
      '/bmw/b8/24.jpg', '/bmw/b8/25.jpg', '/bmw/b8/26.jpg', '/bmw/b8/27.jpg', '/bmw/b8/28.jpg',],
    price: '146000',
    description: 'The Ultimate Driving Machine',
    type: 'Sedan',
    year: 2025,
    specs: {
      power: '617 HP',
      acceleration: '3.0s',
      topSpeed: '190 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'BMW ALPINA B8',
        description: 'La máquina de conducción definitiva',
        type: 'Sedan',

      },
      en: {
        name: 'BMW ALPINA B8',
        description: 'The Ultimate Driving Machine',
        type: 'Sedan',
      },
    },
  },
  {
    id: 'amg-gt-black-series',
    brandId: 'mercedes',
    name: 'Mercedes-AMG GT Black Series',
    image: '/mb/amg-gt-black/12.jpg',
    images: [
      '/mb/amg-gt-black/1.jpg',
      '/mb/amg-gt-black/2.jpg',
      '/mb/amg-gt-black/3.jpg',
      '/mb/amg-gt-black/4.jpg',
      '/mb/amg-gt-black/5.jpg',
      '/mb/amg-gt-black/6.jpg',
      '/mb/amg-gt-black/7.jpg',
      '/mb/amg-gt-black/8.jpg',
      '/mb/amg-gt-black/9.jpg',
      '/mb/amg-gt-black/10.jpg',
      '/mb/amg-gt-black/11.jpg',
      '/mb/amg-gt-black/12.jpg',
    ],
    price:'325000',
    description: 'The ultimate AMG performance machine.',
    type: 'Coupe',
    year: 2025,
    specs: {
      power: '720 HP',
      acceleration: '3.2s',
      topSpeed: '202 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Mercedes-AMG GT Black Series',
        description: 'La máquina de rendimiento definitiva de AMG.',
        type: 'Coupe',
      },
      en: {
        name: 'Mercedes-AMG GT Black Series',
        description: 'The ultimate AMG performance machine.',
        type: 'Coupe',
      },
    },
  },
  {
    id: 's-class-maybach',
    brandId: 'mercedes',
    name: 'Mercedes-Maybach S-Class',
    image: '/mb/s-class-maybach/23.jpg',
    images: [
      '/mb/s-class-maybach/1.jpg', '/mb/s-class-maybach/2.jpg', '/mb/s-class-maybach/3.jpg', '/mb/s-class-maybach/4.jpg',
      '/mb/s-class-maybach/5.jpg', '/mb/s-class-maybach/6.jpg', '/mb/s-class-maybach/7.jpg', '/mb/s-class-maybach/8.jpg',
      '/mb/s-class-maybach/9.jpg', '/mb/s-class-maybach/10.jpg', '/mb/s-class-maybach/11.jpg', '/mb/s-class-maybach/12.jpg',
      '/mb/s-class-maybach/13.jpg', '/mb/s-class-maybach/14.jpg', '/mb/s-class-maybach/15.jpg', '/mb/s-class-maybach/16.jpg',
      '/mb/s-class-maybach/17.jpg', '/mb/s-class-maybach/18.jpg', '/mb/s-class-maybach/19.jpg', '/mb/s-class-maybach/20.jpg',
      '/mb/s-class-maybach/21.jpg', '/mb/s-class-maybach/22.jpg', '/mb/s-class-maybach/23.jpg', '/mb/s-class-maybach/24.jpg',
      '/mb/s-class-maybach/25.jpg', '/mb/s-class-maybach/26.jpg', '/mb/s-class-maybach/28.jpg',
      '/mb/s-class-maybach/29.jpg',
    ],
    price: '185000',
    description: 'A pinnacle of luxury and comfort.',
    type: 'Sedan',
    year: 2025,
    specs: {
      power: '496 HP',
      acceleration: '4.4s',
      topSpeed: '155 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Mercedes-Maybach S-Class',
        description: 'La cima del lujo y la comodidad.',
        type: 'Sedan',
      },
      en: {
        name: 'Mercedes-Maybach S-Class',
        description: 'A pinnacle of luxury and comfort.',
        type: 'Sedan',
      },
    },
  },
  {
    id: 'eqs-580',
    brandId: 'mercedes',
    name: 'Mercedes-Benz EQS 580',
    image: '/mb/eqs-580/1.jpg',
    images: [
      '/mb/eqs-580/1.jpg',
      '/mb/eqs-580/2.jpg',
      '/mb/eqs-580/3.jpg',
      '/mb/eqs-580/4.jpg',
      '/mb/eqs-580/5.jpg',
      '/mb/eqs-580/6.jpg',
      '/mb/eqs-580/7.jpg',
      '/mb/eqs-580/8.jpg',
      '/mb/eqs-580/9.jpg',
      '/mb/eqs-580/10.jpg',
      '/mb/eqs-580/11.jpg',
      '/mb/eqs-580/12.jpg',
      '/mb/eqs-580/13.jpg'
    ],
    price: '125000',
    description: 'The future of luxury electric mobility.',
    type: 'Electric',
    year: 2025,
    specs: {
      power: '516 HP',
      acceleration: '4.1s',
      topSpeed: '130 mph'
    },
    stock: 2,

    translations: {
      es: {
        name: 'Mercedes-Benz EQS 580',
        description: 'El futuro de la movilidad eléctrica de lujo.',
        type: 'Electric',

      },
      en: {
        name: 'Mercedes-Benz EQS 580',
        description: 'The future of luxury electric mobility.',
        type: 'Electric',
      },
    }
  },
  {
    id: 'rs7-performance',
    brandId: 'audi',
    name: 'Audi RS7 Performance',
    image: '/audi/rs7/11.jpg',
    images: [
      '/audi/rs7/9.avif', '/audi/rs7/11.jpg','/audi/rs7/7.avif', '/audi/rs7/8.avif', '/audi/rs7/12.webp'

      , '/audi/rs7/5.avif', '/audi/rs7/6.avif',
      '/audi/rs7/2.avif', '/audi/rs7/3.avif', '/audi/rs7/4.avif',
    ],
    price: '121000',
    description: 'Dynamic design and thrilling performance.',
    type: 'Sedan',
    year: 2025,
    specs: {
      power: '591 HP',
      acceleration: '3.5s',
      topSpeed: '190 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Audi RS7 Performance',
        description: 'Diseño dinámico y rendimiento emocionante.',
        type: 'Sedan',

      },
      en: {
        name: 'Audi RS7 Performance',
        description: 'Dynamic design and thrilling performance.',
        type: 'Sedan',
      },
    }
  },
  {
    id: 'e-tron-gt',
    brandId: 'audi',
    name: 'Audi e-tron GT',
    image: '/audi/e-tron/9.jpg',
    images: [
      '/audi/e-tron/1.jpg', '/audi/e-tron/2.jpg', '/audi/e-tron/3.jpg', '/audi/e-tron/4.jpg',
      '/audi/e-tron/5.jpg', '/audi/e-tron/6.jpg', '/audi/e-tron/7.jpg', '/audi/e-tron/8.jpg',
      '/audi/e-tron/9.jpg', '/audi/e-tron/10.jpg', '/audi/e-tron/11.jpg'
    ],
    price: '105000',
    description: 'A fully electric masterpiece of engineering.',
    type: 'Coupe',
    year: 2025,
    specs: {
      power: '469 HP',
      acceleration: '3.9s',
      topSpeed: '152 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Audi e-tron GT',
        description: 'Una obra maestra completamente eléctrica de ingeniería.',
        type: 'Coupe',

      },
      en: {
        name: 'Audi e-tron GT',
        description: 'A fully electric masterpiece of engineering.',
        type: 'Coupe',
      },
    }
  },
  {
    id: 'r8-v10-performance',
    brandId: 'audi',
    name: 'Audi R8 V10 Performance',
    image: '/audi/r8/1.jpg',
    images: [
      '/audi/r8/1.jpg', '/audi/r8/2.jpg', '/audi/r8/3.jpg', '/audi/r8/4.jpg',
      '/audi/r8/5.jpg', '/audi/r8/6.jpg', '/audi/r8/7.jpg', '/audi/r8/8.jpg',
      '/audi/r8/9.jpg', '/audi/r8/10.jpg', '/audi/r8/11.jpg', '/audi/r8/12.jpg',
      '/audi/r8/13.jpg', '/audi/r8/14.jpg', '/audi/r8/15.jpg', '/audi/r8/16.jpg',
      '/audi/r8/17.jpg', '/audi/r8/18.jpg', '/audi/r8/19.jpg', '/audi/r8/20.jpg',
      '/audi/r8/21.jpg', '/audi/r8/22.jpg', '/audi/r8/23.jpg', '/audi/r8/24.jpg',
      '/audi/r8/25.jpg'
    ],
    price: '211000',
    description: 'The ultimate mid-engine supercar.',
    type: 'Supercar',
    year: 2025,
    specs: {
      power: '602 HP',
      acceleration: '3.1s',
      topSpeed: '205 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Audi R8 V10 Performance',
        description: 'El superdeportivo de motor central definitivo.',
        type: 'Supercar',
      },
      en: {
        name: 'Audi R8 V10 Performance',
        description: 'The ultimate mid-engine supercar.',
        type: 'Supercar',
      },
    }
  },
  {
    id: '911-turbo-s',
    brandId: 'porsche',
    name: 'Porsche 911 Turbo S',
    image: '/por/911/6.jpg',
    images: [
      '/por/911/1.jpg', '/por/911/2.jpg', '/por/911/3.jpg', '/por/911/4.jpg',
      '/por/911/5.jpg', '/por/911/6.jpg', '/por/911/7.jpg', '/por/911/8.jpg',
      '/por/911/9.jpg', '/por/911/10.jpg', '/por/911/11.jpg', '/por/911/12.jpg',
      '/por/911/13.jpg', '/por/911/14.jpg', '/por/911/15.jpg', '/por/911/16.jpg',
      '/por/911/17.jpg', '/por/911/18.jpg', '/por/911/19.jpg', '/por/911/20.jpg',
      '/por/911/21.jpg'
    ],
    price: '204000',
    description: 'The iconic Porsche 911 Turbo S, designed for pure performance.',
    type: 'Supercar',
    year: 2025,
    specs: {
      power: '640 HP',
      acceleration: '2.7s',
      topSpeed: '205 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Porsche 911 Turbo S',
        description: 'El icónico Porsche 911 Turbo S, diseñado para un rendimiento puro.',
        type: 'Supercar',
      },
      en: {
        name: 'Porsche 911 Turbo S',
        description: 'The iconic Porsche 911 Turbo S, designed for pure performance.',
        type: 'Supercar',
      },
    }
  },
  {
    id: '718-cayman-gt4',
    brandId: 'porsche',
    name: 'Porsche 718 Cayman GT4',
    image: '/por/718/1.jpg',
    images: [
      '/por/718/1.jpg', '/por/718/2.jpg', '/por/718/3.jpg', '/por/718/4.jpg',
      '/por/718/5.jpg'
    ],
    price: '99000',
    description: 'A perfect balance of power and handling in a compact form.',
    type: 'Sports Car',
    year: 2025,
    specs: {
      power: '420 HP',
      acceleration: '3.8s',
      topSpeed: '188 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Porsche 718 Cayman GT4',
        description: 'Un equilibrio perfecto de potencia y manejo en una forma compacta.',
        type: 'Coche Deportivo',
      },
      en: {
        name: 'Porsche 718 Cayman GT4',
        description: 'A perfect balance of power and handling in a compact form.',
        type: 'Sports Car',
      },
    }
  },
  {
    id: 'panamera-turbo-s',
    brandId: 'porsche',
    name: 'Porsche Panamera Turbo S',
    image: '/por/panamera/1.webp',
    images: [
      '/por/panamera/1.webp', '/por/panamera/2.webp', '/por/panamera/3.webp', '/por/panamera/4.webp',
      '/por/panamera/5.webp', '/por/panamera/6.webp', '/por/panamera/7.webp', '/por/panamera/8.webp',
      '/por/panamera/9.webp', '/por/panamera/10.webp', '/por/panamera/11.webp', '/por/panamera/12.webp',
    ],
    price: '182000',
    description: 'The perfect combination of luxury and performance in a sedan.',
    type: 'Luxury Sedan',
    year: 2025,
    specs: {
      power: '620 HP',
      acceleration: '3.1s',
      topSpeed: '196 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Porsche Panamera Turbo S',
        description: 'La combinación perfecta de lujo y rendimiento en una berlina.',
        type: 'Sedán de lujo',
      },
      en: {
        name: 'Porsche Panamera Turbo S',
        description: 'The perfect combination of luxury and performance in a sedan.',
        type: 'Luxury Sedan',
      },
    }
  },
  {
    id: 'sf90-stradale',
    brandId: 'ferrari',
    name: 'Ferrari SF90 Stradale',
    image: '/fer/sf90/12.webp',
    images: [
      '/fer/sf90/1.jpg', '/fer/sf90/2.jpg', '/fer/sf90/3.jpg', '/fer/sf90/4.jpg',
      '/fer/sf90/5.jpg', '/fer/sf90/6.jpg', '/fer/sf90/7.jpg', '/fer/sf90/8.jpg',
      '/fer/sf90/9.webp', '/fer/sf90/10.webp', '/fer/sf90/11.webp', '/fer/sf90/12.webp',
      '/fer/sf90/13.webp', '/fer/sf90/14.webp', '/fer/sf90/15.webp', '/fer/sf90/16.webp',
      '/fer/sf90/17.webp', '/fer/sf90/18.webp', '/fer/sf90/19.webp', '/fer/sf90/20.webp',
      '/fer/sf90/21.webp', '/fer/sf90/22.webp', '/fer/sf90/23.webp', '/fer/sf90/24.webp',
      '/fer/sf90/25.webp', '/fer/sf90/26.webp'

    ],
    price: '625000',
    description: 'Ferrari’s most powerful and fastest road car, combining cutting-edge hybrid technology.',
    type: 'Supercar',
    year: 2025,
    specs: {
      power: '986 HP',
      acceleration: '2.5s',
      topSpeed: '211 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Ferrari SF90 Stradale',
        description: 'El coche de carretera más potente y rápido de Ferrari, combinando tecnología híbrida de vanguardia.',
        type: 'Superdeportivo',
      },
      en: {
        name: 'Ferrari SF90 Stradale',
        description: 'Ferrari’s most powerful and fastest road car, combining cutting-edge hybrid technology.',
        type: 'Supercar',
      },
    }
  },
  {
    id: '812-superfast',
    brandId: 'ferrari',
    name: 'Ferrari 812 Superfast',
    image: '/fer/812/1.jpg',
    images: [
      '/fer/812/1.jpg', '/fer/812/2.jpg', '/fer/812/3.jpg', '/fer/812/4.jpg',
      '/fer/812/5.jpg', '/fer/812/6.jpg', '/fer/812/7.jpg', '/fer/812/8.jpg',
      '/fer/812/9.jpg', '/fer/812/10.jpg', '/fer/812/12.jpg', '/fer/812/13.jpg',
      '/fer/812/14.jpg', '/fer/812/15.jpg', '/fer/812/16.jpg'
    ],
    price: '335000',
    description: 'A naturally aspirated V12 engine delivering breathtaking performance and an unmatched driving experience.',
    type: 'Grand Tourer',
    year: 2025,
    specs: {
      power: '789 HP',
      acceleration: '2.9s',
      topSpeed: '211 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'fer 812 Superfast',
        description: 'Un motor V12 naturalmente aspirado que ofrece un rendimiento impresionante y una experiencia de conducción inigualable.',
        type: 'Gran Turismo',
      },
      en: {
        name: 'fer 812 Superfast',
        description: 'A naturally aspirated V12 engine delivering breathtaking performance and an unmatched driving experience.',
        type: 'Grand Tourer',
      },
    }
  },
  {
    id: 'portofino-m',
    brandId: 'ferrari',
    name: 'fer Portofino M',
    image: '/fer/portofino/1.jpg',
    images: [
      '/fer/portofino/1.jpg', '/fer/portofino/2.jpg', '/fer/portofino/3.jpg', '/fer/portofino/4.webp',
      '/fer/portofino/5.webp', '/fer/portofino/6.webp', '/fer/portofino/7.webp', '/fer/portofino/8.webp',
      '/fer/portofino/9.webp', '/fer/portofino/10.webp', '/fer/portofino/11.webp', '/fer/portofino/12.webp',
      '/fer/portofino/13.webp', '/fer/portofino/14.webp', '/fer/portofino/15.webp', '/fer/portofino/16.webp',
      '/fer/portofino/17.webp', '/fer/portofino/18.webp', '/fer/portofino/19.webp', '/fer/portofino/20.webp',
      '/fer/portofino/21.webp'
    ],
    price: '250000',
    description: 'The perfect blend of sportiness and elegance, combining a powerful twin-turbo V8 with an open-top design.',
    type: 'Convertible',
    year: 2025,
    specs: {
      power: '620 HP',
      acceleration: '3.5s',
      topSpeed: '199 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'fer Portofino M',
        description: 'La mezcla perfecta de deportividad y elegancia, combinando un potente V8 biturbo con un diseño de techo abierto.',
        type: 'Convertible',
      },
      en: {
        name: 'fer Portofino M',
        description: 'The perfect blend of sportiness and elegance, combining a powerful twin-turbo V8 with an open-top design.',
        type: 'Convertible',
      },
    }
  },
  {
    id: 'aventador-lp-780-4-ultimae',
    brandId: 'lamborghini',
    name: 'Lamborghini Aventador LP 780-4 Ultimae',
    image: '/lambo/aventador/5.jpg',
    images: [
      '/lambo/aventador/1.jpg', '/lambo/aventador/2.jpg', '/lambo/aventador/3.jpg',
      '/lambo/aventador/4.jpg', '/lambo/aventador/5.jpg', '/lambo/aventador/6.jpg',
      '/lambo/aventador/7.jpg', '/lambo/aventador/8.jpg', '/lambo/aventador/9.jpg',
      '/lambo/aventador/10.jpg', '/lambo/aventador/11.jpg', '/lambo/aventador/12.jpg',
      '/lambo/aventador/13.jpg', '/lambo/aventador/14.jpg', '/lambo/aventador/15.jpg',
      '/lambo/aventador/16.jpg', '/lambo/aventador/17.jpg', '/lambo/aventador/18.jpg',
      '/lambo/aventador/19.jpg', '/lambo/aventador/20.jpg', '/lambo/aventador/21.jpg',
      '/lambo/aventador/22.jpg', '/lambo/aventador/23.jpg', '/lambo/aventador/24.jpg',
      '/lambo/aventador/25.jpg', '/lambo/aventador/26.jpg', '/lambo/aventador/27.jpg',
      '/lambo/aventador/28.jpg', '/lambo/aventador/29.jpg', '/lambo/aventador/30.jpg',
      '/lambo/aventador/31.jpg', '/lambo/aventador/32.jpg', '/lambo/aventador/33.jpg',
      '/lambo/aventador/34.jpg'
    ],
    price: '498000',
    description: 'A celebration of the Aventador legacy with unmatched performance and design.',
    type: 'Supercar',
    year: 2025,
    specs: {
      power: '780 HP',
      acceleration: '2.8s',
      topSpeed: '221 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Lamborghini Aventador LP 780-4 Ultimae',
        description: 'Una celebración del legado Aventador con un rendimiento y diseño incomparables.',
        type: 'Superdeportivo',
      },
      en: {
        name: 'Lamborghini Aventador LP 780-4 Ultimae',
        description: 'A celebration of the Aventador legacy with unmatched performance and design.',
        type: 'Supercar',
      },
    }
  },  
  {
    id: 'huracan-sto',
    brandId: 'lamborghini',
    name: 'Lamborghini Huracán STO',
    image: '/lambo/huracan/30.jpg',
    images: [
      '/lambo/huracan/1.avif', '/lambo/huracan/2.avif', '/lambo/huracan/3.avif',
      '/lambo/huracan/4.avif', '/lambo/huracan/5.avif', '/lambo/huracan/6.avif',
      '/lambo/huracan/7.avif', '/lambo/huracan/8.avif', '/lambo/huracan/9.avif',
      '/lambo/huracan/10.avif', '/lambo/huracan/11.jpg', '/lambo/huracan/12.avif',
      '/lambo/huracan/13.jpg', '/lambo/huracan/14.avif', '/lambo/huracan/15.avif',
      '/lambo/huracan/16.webp', '/lambo/huracan/17.webp', '/lambo/huracan/18.webp',
      '/lambo/huracan/19.jpg', '/lambo/huracan/20.avif', '/lambo/huracan/21.jpg',
      '/lambo/huracan/22.avif', '/lambo/huracan/23.avif', '/lambo/huracan/24.avif',
      '/lambo/huracan/25.avif', '/lambo/huracan/26.avif', '/lambo/huracan/27.avif',
      '/lambo/huracan/28.avif', '/lambo/huracan/29.webp', '/lambo/huracan/30.avif',
      '/lambo/huracan/31.avif'
    ],
    price: '327000',
    description: 'Track-inspired engineering for the ultimate performance.',
    type: 'Supercar',
    year: 2025,
    specs: {
      power: '640 HP',
      acceleration: '3.0s',
      topSpeed: '193 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Lamborghini Huracán STO',
        description: 'Ingeniería inspirada en la pista para el máximo rendimiento.',
        type: 'Superdeportivo',
      },
      en: {
        name: 'Lamborghini Huracán STO',
        description: 'Track-inspired engineering for the ultimate performance.',
        type: 'Supercar',
      },
    }
  },
  {
    id: 'urus-performante',
    brandId: 'lamborghini',
    name: 'Lamborghini Urus Performante',
    image: '/lambo/urus/1.jpg',
    images: [
      '/lambo/urus/1.jpg', '/lambo/urus/2.jpg', '/lambo/urus/3.jpg',
      '/lambo/urus/4.jpg', '/lambo/urus/5.jpg', '/lambo/urus/6.jpg',
      '/lambo/urus/7.jpg', '/lambo/urus/8.jpg', '/lambo/urus/9.jpg',
      '/lambo/urus/10.jpg', '/lambo/urus/11.jpg', '/lambo/urus/12.jpg',
       '/lambo/urus/14.jpg', '/lambo/urus/15.jpg',
      '/lambo/urus/16.jpg', '/lambo/urus/17.jpg',
    ],
    price: '260000',
    description: 'The pinnacle of high-performance SUVs.',
    type: 'SUV',
    year: 2025,
    specs: {
      power: '657 HP',
      acceleration: '3.3s',
      topSpeed: '190 mph'
    },
    stock: 2,
    translations: {
      es: {
        name: 'Lamborghini Urus Performante',
        description: 'El pináculo de los SUV de alto rendimiento.',
        type: 'SUV',
      },
      en: {
        name: 'Lamborghini Urus Performante',
        description: 'The pinnacle of high-performance SUVs.',
        type: 'SUV',
      },
    }
  }
  
  
  






];

