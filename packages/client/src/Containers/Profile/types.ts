import { RateI, UserDetailsI } from '../../utils/types';

export enum ActionTypes {
  GET_USER = 'get-user',
  ON_RECEIVE_USER = 'on-receive-user',
  UPDATE_DESCRIPTION = 'update-description',
  GET_RATE_CHART = 'get-rate-chart',
  ON_RECEIVE_RATE_CHART = 'on-receive-rate-chart',
  INSERT_RATE = 'insert-rate',
}

export interface MapStateToPropsI {
  userDetails: UserDetailsI;
  rateChart: RateI[];
}

export interface MapDispatchToPropsI {
  getUser: (id: string) => void;
  getRateChart: (email: string) => void;
  insertRate: (orangeName: string, orangePrice: number) => void;
}

export interface ComponentPropsI {
  profileId: string;
}

export type PropsI = MapStateToPropsI & MapDispatchToPropsI & ComponentPropsI;

export interface ComponentStateI {
  rowIdToEdit: string;
  rowIdToDelete: string;
}

export interface StoreStateI {
  userDetails: UserDetailsI;
  rateChart: RateI[];
}
