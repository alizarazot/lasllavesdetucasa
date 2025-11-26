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
];
