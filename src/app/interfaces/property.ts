export interface Property {
  id: string;
  hidden: boolean;
  title: string;
  subtitle: string;
  img: Image[];
  type: string;
  city: 'Gdynia' | 'Sopot' | 'Gdańsk';
  distriction: string;
  transactionType: string;
  rooms: number;
  area: number;
  price: number;
  year: number;
  offer: string;
  floor: number;
  features: string[];
  descriptionTitle?: string;
  description: string;
  agent: Agent;
}

export interface Image {
  url: string;
  id?: number;
  name?: string;
}

export interface Agent {
  name: string;
  agency: string;
  photo: string;
  phone: string;
  email: string;
}
