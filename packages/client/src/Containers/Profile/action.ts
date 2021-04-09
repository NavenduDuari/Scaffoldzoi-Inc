import { ActionTypes } from './types';
import { Action, UserDetailsI, RateI } from '../../utils/types';

export const getUserAction = (id: string): Action<ActionTypes> => ({
  type: ActionTypes.GET_USER,
  payload: {
    id,
  },
});

export const onReceiveUserAction = (
  user: UserDetailsI
): Action<ActionTypes> => ({
  type: ActionTypes.ON_RECEIVE_USER,
  payload: {
    user,
  },
});

export const getRateChartAction = (email: string): Action<ActionTypes> => ({
  type: ActionTypes.GET_RATE_CHART,
  payload: {
    email,
  },
});

export const onReceiveRateChartAction = (
  rateChart: RateI[]
): Action<ActionTypes> => ({
  type: ActionTypes.ON_RECEIVE_RATE_CHART,
  payload: {
    rateChart,
  },
});

export const insertRateAction = (
  orangeName: string,
  orangePrice: number
): Action<ActionTypes> => ({
  type: ActionTypes.INSERT_RATE,
  payload: {
    orangeName,
    orangePrice,
  },
});
