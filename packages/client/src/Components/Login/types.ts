export interface ComponentPropsI {
  performAuth: (email: string, password: string) => void;
  componentTitle: 'Login' | 'Signup';
  token: string;
}

export interface ComponentStateI {}
