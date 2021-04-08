export interface Action<T> {
  type: T;
  payload?: Record<string, any>;
}

export interface UserDetailsI {
  _id: string;
  email: string;
  username: string;
  description: string;
  avatar: string;
  createdAt: number;
  updatedAt: number;
}

export enum LocalStorageKey {
  Token = '__scaffoldzoi-token__',
}
