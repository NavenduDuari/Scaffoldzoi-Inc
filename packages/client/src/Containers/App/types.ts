import { UserDetailsI, LogInRoutePurpose } from '../../utils/types';

export enum ActionTypes {
  PERFORM_AUTH = 'perform-auth',
  LOAD_LOCAL_TOKEN = 'load-local-token',
  ON_LOAD_LOCAL_TOKEN = 'on-load-local-token',
  GET_ALL_SELLERS = 'get-all-sellers',
  ON_RECEIVE_ALL_SELLERS = 'on-receive-all-sellers',
  LOG_OUT = 'log-out',
}

export enum TokenStatus {
  YetToFetch = 'yetToFetch',
  Fetched = 'fetched',
}

export interface MapStateToPropsI {
  token: string;
  tokenStatus: TokenStatus;
  loggedInUser: UserDetailsI;
  sellers: UserDetailsI[];
}

export interface MapDispatchToPropsI {
  loadLocalToken: () => void;
  performAuth: (
    purpose: LogInRoutePurpose,
    name: string,
    email: string,
    password: string,
    profileType: string
  ) => void;
  getAllSellers: () => void;
  logOut: () => void;
}

export interface ComponentPropsI {}

export type PropsI = MapStateToPropsI & MapDispatchToPropsI & ComponentPropsI;

export interface ComponentStateI {
  // redirectedToLoginPage: boolean;
}

export interface StoreStateI {
  token: string;
  tokenStatus: TokenStatus;
  loggedInUser: UserDetailsI;
  sellers: UserDetailsI[];
}

export interface ContextI {
  redirectTo: (url: string) => void;
  token: string;
  loggedInUser: UserDetailsI;
}
