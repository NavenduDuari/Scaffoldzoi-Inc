export enum ActionTypes {
  PERFORM_AUTH = 'perform-auth',
  LOAD_LOCAL_TOKEN = 'load-local-token',
  ON_LOAD_LOCAL_TOKEN = 'on-load-local-token',
}

export interface MapStateToPropsI {
  token: string;
}

export interface MapDispatchToPropsI {
  loadLocalToken: () => void;
  performAuth: (email: string, password: string) => void;
}

export interface ComponentPropsI {}

export type PropsI = MapStateToPropsI & MapDispatchToPropsI & ComponentPropsI;

export interface ComponentStateI {}

export interface StoreStateI {
  token: string;
}
