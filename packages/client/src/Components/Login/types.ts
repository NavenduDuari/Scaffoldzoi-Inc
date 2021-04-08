export interface ComponentPropsI {
  performAuth: (email: string, password: string) => void;
  componentTitle: 'Login' | 'Signup';
}

export interface ComponentStateI {
  email: string;
  password: string;
}
