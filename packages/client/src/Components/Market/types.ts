import { UserDetailsI } from '../../utils/types';

export interface ComponentPropsI {
  getAllSellers: () => void;
  sellers: UserDetailsI[];
}

export interface ComponentStateI {}
