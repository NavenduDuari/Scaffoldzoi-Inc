import { Action, UserDetailsI } from '../../utils/types';
import { ActionTypes, StoreStateI } from './types';

const INITIAL_STATE: StoreStateI = {
  userDetails: {} as UserDetailsI,
  rateChart: [],
};

const profileReducer = (state = INITIAL_STATE, action: Action<ActionTypes>) => {
  switch (action.type) {
    case ActionTypes.ON_RECEIVE_USER:
      return {
        ...state,
        userDetails: action.payload?.user || {},
      };

    case ActionTypes.ON_RECEIVE_RATE_CHART:
      return {
        ...state,
        rateChart: action.payload?.rateChart || [],
      };

    default:
      return state;
  }
};

export default profileReducer;
