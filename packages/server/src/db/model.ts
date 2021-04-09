export enum ProfileType {
  Seller = 'seller',
  Buyer = 'buyer',
}

export interface User {
  email: string;
  username: string;
  password: string;
  description: string;
  avatar: string;
  profileType: ProfileType;
  createdAt: number;
  updatedAt: number;
}

enum WeightUnit {
  Kg = 'kg',
  Lbs = 'lbs',
}

enum Currency {
  INR = 'inr',
  USD = 'usd',
  EUR = 'eur',
}

export interface GoodsMeta {
  type: string;
  price: number;
  weightUnit: WeightUnit;
  currency: Currency;
}

export interface Rate {
  email: string;
  goodsMeta: GoodsMeta;
}
