export interface Room {
  _id: string;
  roomNumber: string;
  name: string;
  type: string;
  description: string;
  price: number;
  capacity: number;
  size: number;
  image: string;
  amenities: string[];
  features: string[];
  isAvailable: boolean;
} 