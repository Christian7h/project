//src/data.ts
import { Brand, Vehicle } from './types';
// Definir las traducciones de cada marca
const translations = {
  en: {
    bmw: { name: 'BMW', description: 'The Ultimate Driving Machine' },
    mercedes: { name: 'Mercedes-Benz', description: 'The Best or Nothing' },
    audi: { name: 'Audi', description: 'Progress through Technology' },
    porsche: { name: 'Porsche', description: 'There is no substitute' },
    ferrari: { name: 'Ferrari', description: 'We build cars' },
    lamborghini: { name: 'Lamborghini', description: 'We build' },
    bugatti: { name: 'Bugatti', description: 'We build cars' },
    koenigsegg: { name: 'Koenigsegg', description: 'We build cars' },
  },
  es: {
    bmw: { name: 'BMW', description: 'La Máxima Máquina de Conducción' },
    mercedes: { name: 'Mercedes-Benz', description: 'Lo Mejor o Nada' },
    audi: { name: 'Audi', description: 'Progreso a través de la Tecnología' },
    porsche: { name: 'Porsche', description: 'No hay sustituto' },
    ferrari: { name: 'Ferrari', description: 'Construimos autos' },
    lamborghini: { name: 'Lamborghini', description: 'Construimos' },
    bugatti: { name: 'Bugatti', description: 'Construimos autos' },
    koenigsegg: { name: 'Koenigsegg', description: 'Construimos autos' },
  },
};

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
      es:{
        name:'Lamborghini',
        description:'Fabricamos autos de lujo',
      },
      en:{
        name:'Lamborghini',
        description:'We build luxury cars',
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
    image: '/bmw/m4cls/bmwm4cls.png',
    images: [
      '/bmw/m4cls/bmwm4cls (20).jpg', '/bmw/m4cls/bmwm4cls (19).jpg', '/bmw/m4cls/bmwm4cls (18).jpg',
      '/bmw/m4cls/bmwm4cls (17).jpg', '/bmw/m4cls/bmwm4cls (16).jpg', '/bmw/m4cls/bmwm4cls (15).jpg',
      '/bmw/m4cls/bmwm4cls (14).jpg', '/bmw/m4cls/bmwm4cls (13).jpg', '/bmw/m4cls/bmwm4cls (12).jpg',
      '/bmw/m4cls/bmwm4cls (11).jpg', '/bmw/m4cls/bmwm4cls (10).jpg', '/bmw/m4cls/bmwm4cls (9).jpg',
      '/bmw/m4cls/bmwm4cls (8).jpg', '/bmw/m4cls/bmwm4cls (7).jpg', '/bmw/m4cls/bmwm4cls (6).jpg',
      '/bmw/m4cls/bmwm4cls (5).jpg', '/bmw/m4cls/bmwm4cls (4).jpg', '/bmw/m4cls/bmwm4cls (3).jpg',
      '/bmw/m4cls/bmwm4cls (2).jpg', '/bmw/m4cls/bmwm4cls (1).jpg'
    ],
    price: '$139,900',
    description: 'Competition. Sport. Lightweight.',
    specs: {
      power: '550 HP',
      acceleration: '3.6s',
      topSpeed: '191 mph'
    },
    translations: {
      es: {
        name: 'BMW M4 CSL',
        description: 'Competición. Deporte. Ligero.',
      },
      en: {
        name: 'BMW M4 CSL',
        description: 'Competition. Sport. Lightweight.',
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
    price: '$142,000',
    description: 'The most powerful M car ever.',
    specs: {
      power: '627 HP',
      acceleration: '2.9s',
      topSpeed: '190 mph'
    },
    translations: {
      es: {
        name: 'BMW M5 CS',
        description: 'El coche M más potente de todos los tiempos.',
      },
      en: {
        name: 'BMW M5 CS',
        description: 'The most powerful M car ever.',
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
    price: '$146,000',
    description: 'The Ultimate Driving Machine',
    specs: {
      power: '617 HP',
      acceleration: '3.0s',
      topSpeed: '190 mph'
    },
    translations: {
      es: {
        name: 'BMW ALPINA B8',
        description: 'La máquina de conducción definitiva',
      },
      en: {
        name: 'BMW ALPINA B8',
        description: 'The Ultimate Driving Machine',
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
    price: '$325,000',
    description: 'The ultimate AMG performance machine.',
    specs: {
      power: '720 HP',
      acceleration: '3.2s',
      topSpeed: '202 mph'
    },
    translations: {
      es: {
        name: 'Mercedes-AMG GT Black Series',
        description: 'La máquina de rendimiento definitiva de AMG.',
      },
      en: {
        name: 'Mercedes-AMG GT Black Series',
        description: 'The ultimate AMG performance machine.',
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
    price: '$185,000',
    description: 'A pinnacle of luxury and comfort.',
    specs: {
      power: '496 HP',
      acceleration: '4.4s',
      topSpeed: '155 mph'
    },
    translations: {
      es: {
        name: 'Mercedes-Maybach S-Class',
        description: 'La cima del lujo y la comodidad.',
      },
      en: {
        name: 'Mercedes-Maybach S-Class',
        description: 'A pinnacle of luxury and comfort.',
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
    price: '$125,000',
    description: 'The future of luxury electric mobility.',
    specs: {
      power: '516 HP',
      acceleration: '4.1s',
      topSpeed: '130 mph'
    },
    translations: {
      es: {
        name: 'Mercedes-Benz EQS 580',
        description: 'El futuro de la movilidad eléctrica de lujo.',
      },
      en: {
        name: 'Mercedes-Benz EQS 580',
        description: 'The future of luxury electric mobility.',
      },
    }
  },
  {
    id: 'rs7-performance',
    brandId: 'audi',
    name: 'Audi RS7 Performance',
    image: '/audi/rs7/rs7-1.jpg',
    images: [
      '/audi/rs7/1.jpg', '/audi/rs7/2.jpg', '/audi/rs7/3.jpg', '/audi/rs7/4.jpg', 
      '/audi/rs7/5.jpg', '/audi/rs7/6.jpg', '/audi/rs7/7.jpg', '/audi/rs7/8.jpg',
      '/audi/rs7/9.jpg', '/audi/rs7/10.jpg', '/audi/rs7/11.jpg', '/audi/rs7/12.jpg'
    ],
    price: '$121,000',
    description: 'Dynamic design and thrilling performance.',
    specs: {
      power: '591 HP',
      acceleration: '3.5s',
      topSpeed: '190 mph'
    },
    translations: {
      es: {
        name: 'Audi RS7 Performance',
        description: 'Diseño dinámico y rendimiento emocionante.',
      },
      en: {
        name: 'Audi RS7 Performance',
        description: 'Dynamic design and thrilling performance.',
      },
    }
  },
  {
    id: 'e-tron-gt',
    brandId: 'audi',
    name: 'Audi e-tron GT',
    image: '/audi/e-tron/e-tron-1.jpg',
    images: [
      '/audi/e-tron/1.jpg', '/audi/e-tron/2.jpg', '/audi/e-tron/3.jpg', '/audi/e-tron/4.jpg',
      '/audi/e-tron/5.jpg', '/audi/e-tron/6.jpg', '/audi/e-tron/7.jpg', '/audi/e-tron/8.jpg',
      '/audi/e-tron/9.jpg', '/audi/e-tron/10.jpg', '/audi/e-tron/11.jpg', '/audi/e-tron/12.jpg'
    ],
    price: '$105,000',
    description: 'A fully electric masterpiece of engineering.',
    specs: {
      power: '469 HP',
      acceleration: '3.9s',
      topSpeed: '152 mph'
    },  
    translations: {
      es: {
        name: 'Audi e-tron GT',
        description: 'Una obra maestra completamente eléctrica de ingeniería.',
      },
      en: {
        name: 'Audi e-tron GT',
        description: 'A fully electric masterpiece of engineering.',
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
    price: '$211,000',
    description: 'The ultimate mid-engine supercar.',
    specs: {
      power: '602 HP',
      acceleration: '3.1s',
      topSpeed: '205 mph'
    },
    translations: {
      es: {
        name: 'Audi R8 V10 Performance',
        description: 'El superdeportivo de motor central definitivo.',
      },
      en: {
        name: 'Audi R8 V10 Performance',
        description: 'The ultimate mid-engine supercar.',
      },
    }    
  }
];

