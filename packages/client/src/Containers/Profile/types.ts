import { UserDetailsI } from '../../utils/types';

export enum ActionTypes {
  GET_USER = 'get-user',
  ON_RECEIVE_USER = 'on-receive-user',
  UPDATE_DESCRIPTION = 'update-description',
}

export interface MapStateToPropsI {
  userDetails: UserDetailsI;
}

export interface MapDispatchToPropsI {
  getUser: (email: string) => void;
}

export interface ComponentPropsI {}

export type PropsI = MapStateToPropsI & MapDispatchToPropsI & ComponentPropsI;

export interface ComponentStateI {}

export interface StoreStateI {
  userDetails: UserDetailsI;
}
