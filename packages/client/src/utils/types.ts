export interface Action<T> {
  type: T;
  payload?: Record<string, any>;
}

export enum ProfileType {
  Seller = 'seller',
  Buyer = 'buyer',
}

export interface UserDetailsI {
  _id: string;
  email: string;
  username: string;
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

export interface RateI {
  _id: string;
  email: string;
  goodsMeta: GoodsMetaI;
}

export enum LocalStorageKey {
  Token = '__scaffoldzoi-token__',
  LoggedInUser = '__scaffoldzoi-logged-in-user__',
}

export enum LogInRoutePurpose {
  Signup = 'signup',
  Login = 'login',
}
