import { LogInRoutePurpose } from '../../utils/types';
export interface ComponentPropsI {
  performAuth: (
    purpose: LogInRoutePurpose,
    name: string,
    email: string,
    password: string,
    profileType: string
  ) => void;
  componentTitle: 'Login' | 'Signup';
  token: string;
}

export interface ComponentStateI {}
