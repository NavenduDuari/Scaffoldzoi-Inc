export enum ActionTypes {
  PERFORM_AUTH = 'perform-auth',
  LOAD_LOCAL_TOKEN = 'load-local-token',
  ON_LOAD_LOCAL_TOKEN = 'on-load-local-token',
  GET_ALL_SELLERS = 'get-all-sellers',
}

export enum TokenStatus {
  YetToFetch = 'yetToFetch',
  Fetched = 'fetched',
}

export interface MapStateToPropsI {
  token: string;
  tokenStatus: TokenStatus;
}

export interface MapDispatchToPropsI {
  loadLocalToken: () => void;
  performAuth: (email: string, password: string) => void;
  getAllSellers: () => void;
}

export interface ComponentPropsI {}

export type PropsI = MapStateToPropsI & MapDispatchToPropsI & ComponentPropsI;

export interface ComponentStateI {
  redirectedToLoginPage: boolean;
}

export interface StoreStateI {
  token: string;
  tokenStatus: TokenStatus;
}

export interface ContextI {
  redirectTo: (url: string) => void;
  token: string;
}
