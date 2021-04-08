import { UserDetailsI } from '../../utils/types';

export enum ActionTypes {
  PERFORM_AUTH = 'perform-auth',
}

export interface MapStateToPropsI {}

export interface MapDispatchToPropsI {
  performAuth: (email: string, password: string) => void;
}

export interface ComponentPropsI {}

export type PropsI = MapStateToPropsI & MapDispatchToPropsI & ComponentPropsI;

export interface ComponentStateI {}

export interface StoreStateI {}
