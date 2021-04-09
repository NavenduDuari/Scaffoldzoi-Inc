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

export enum WeightUnit {
  Kg = 'kg',
  Lbs = 'lbs',
}

export enum Currency {
  INR = 'inr',
  USD = 'usd',
  EUR = 'eur',
}

export interface GoodsMetaI {
  type: string;
  price: number;
  weightUnit: WeightUnit;
  currency: Currency;
}

export interface Rate {
  email: string;
  goodsMeta: GoodsMetaI;
}
