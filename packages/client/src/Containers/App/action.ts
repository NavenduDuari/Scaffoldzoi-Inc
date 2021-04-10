import { ActionTypes } from './types';
import { Action, UserDetailsI, LogInRoutePurpose } from '../../utils/types';

export const performAuthAction = (
  purpose: LogInRoutePurpose,
  email: string,
  password: string,
  profileType: string
): Action<ActionTypes> => ({
  type: ActionTypes.PERFORM_AUTH,
  payload: {
    purpose,
    email,
    password,
    profileType,
  },
});

export const loadLocalTokenAction = (): Action<ActionTypes> => ({
  type: ActionTypes.LOAD_LOCAL_TOKEN,
});

export const onLoadLocalTokenAction = (
  token: string,
  loggedInUser: UserDetailsI
): Action<ActionTypes> => ({
  type: ActionTypes.ON_LOAD_LOCAL_TOKEN,
  payload: {
    token,
    loggedInUser,
  },
});

export const getAllSellersAction = (): Action<ActionTypes> => ({
  type: ActionTypes.GET_ALL_SELLERS,
});

export const onReceiveAllSellersAction = (
  sellers: UserDetailsI[]
): Action<ActionTypes> => ({
  type: ActionTypes.ON_RECEIVE_ALL_SELLERS,
  payload: {
    sellers,
  },
});

export const logOutAction = (): Action<ActionTypes> => ({
  type: ActionTypes.LOG_OUT,
});
