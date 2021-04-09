export interface ComponentPropsI {
  performAuth: (email: string, password: string, profileType: string) => void;
  componentTitle: 'Login' | 'Signup';
  token: string;
}

export interface ComponentStateI {}
