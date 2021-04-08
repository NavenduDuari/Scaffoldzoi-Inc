export interface Action<T> {
  type: T;
  payload: any;
}

export interface UserDetailsI {
  id: string;
  email: string;
  username: string;
  description: string;
  avatar: string;
}
