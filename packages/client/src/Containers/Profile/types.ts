import { RateI, UserDetailsI } from '../../utils/types';

export enum ActionTypes {
  GET_USER = 'get-user',
  ON_RECEIVE_USER = 'on-receive-user',
  UPDATE_DESCRIPTION = 'update-description',
  GET_RATE_CHART = 'get-rate-chart',
  ON_RECEIVE_RATE_CHART = 'on-receive-rate-chart',
  INSERT_RATE = 'insert-rate',
  DELETE_RATE = 'delete-rate',
  UPDATA_RATE = 'update-rate',
  UPDATE_USER = 'update-user',
}

export interface MapStateToPropsI {
  userDetails: UserDetailsI;
  rateChart: RateI[];
}

export interface MapDispatchToPropsI {
  getUser: (id: string) => void;
  getRateChart: (id: string) => void;
  insertRate: (orangeName: string, orangePrice: number) => void;
  deleteRate: (id: string) => void;
  updateRate: (id: string, jobs: { path: string[]; value: any }[]) => void;
  updateUser: (id: string, path: string[], value: any) => void;
}

export interface ComponentPropsI {
  profileId: string;
}

export type PropsI = MapStateToPropsI & MapDispatchToPropsI & ComponentPropsI;

export interface ComponentStateI {
  editProfileName: boolean;
  editProfileDescription: boolean;
  editProfileEmail: boolean;
}

export interface StoreStateI {
  userDetails: UserDetailsI;
  rateChart: RateI[];
}
