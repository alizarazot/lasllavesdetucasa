export interface Property {
  image: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  price: number;
}

export const PROPERTIES: Property[] = [
  {
    image: '/demo/house1.jpg',
    address: 'Street #8-5',
    bedrooms: 6,
    bathrooms: 2,
    parking: true,
    price: 189000000,
  },
  {
    image: '/demo/house2.png',
    address: 'Street #29-70',
    bedrooms: 4,
    bathrooms: 1,
    parking: false,
    price: 122000000,
  },
  {
    image: '/demo/house3.png',
    address: 'Street 12A #35',
    bedrooms: 3,
    bathrooms: 1,
    parking: false,
    price: 37000000,
  },
  {
    image: '/demo/house1.jpg',
    address: 'Avenue 5 #45-12',
    bedrooms: 5,
    bathrooms: 3,
    parking: true,
    price: 250000000,
  },
  {
    image: '/demo/house2.png',
    address: 'Carrera 7 #10-20',
    bedrooms: 2,
    bathrooms: 1,
    parking: false,
    price: 95000000,
  },
  {
    image: '/demo/house3.png',
    address: 'Calle 100 #15-30',
    bedrooms: 3,
    bathrooms: 2,
    parking: true,
    price: 150000000,
  },
  {
    image: '/demo/house1.jpg',
    address: 'Transversal 4 #22-11',
    bedrooms: 4,
    bathrooms: 2,
    parking: true,
    price: 180000000,
  },
  {
    image: '/demo/house2.png',
    address: 'Diagonal 6 #33-44',
    bedrooms: 3,
    bathrooms: 1,
    parking: false,
    price: 110000000,
  },
  {
    image: '/demo/house3.png',
    address: 'Avenue 68 #50-10',
    bedrooms: 2,
    bathrooms: 2,
    parking: true,
    price: 135000000,
  },
  {
    image: '/demo/house1.jpg',
    address: 'Calle 26 #60-90',
    bedrooms: 5,
    bathrooms: 4,
    parking: true,
    price: 320000000,
  },
  {
    image: '/demo/house2.png',
    address: 'Carrera 15 #85-15',
    bedrooms: 1,
    bathrooms: 1,
    parking: true,
    price: 85000000,
  },
  {
    image: '/demo/house3.png',
    address: 'Calle 72 #11-22',
    bedrooms: 3,
    bathrooms: 2,
    parking: false,
    price: 160000000,
  },
  {
    image: '/demo/house1.jpg',
    address: 'Carrera 30 #45-67',
    bedrooms: 4,
    bathrooms: 3,
    parking: true,
    price: 210000000,
  },
];
