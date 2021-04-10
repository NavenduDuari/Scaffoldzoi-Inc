import { Action, UserDetailsI } from '../../utils/types';
import { ActionTypes, StoreStateI, TokenStatus } from './types';

const INITIAL_STATE: StoreStateI = {
  token: '',
  tokenStatus: TokenStatus.YetToFetch,
  loggedInUser: {} as UserDetailsI,
  sellers: [],
};

const appReducer = (state = INITIAL_STATE, action: Action<ActionTypes>) => {
  switch (action.type) {
    case ActionTypes.ON_LOAD_LOCAL_TOKEN:
      return {
        ...state,
        token: action.payload?.token,
        tokenStatus: TokenStatus.Fetched,
        loggedInUser: action.payload?.loggedInUser || {},
      };

    case ActionTypes.ON_RECEIVE_ALL_SELLERS:
      return {
        ...state,
        sellers: action.payload?.sellers || [],
      };

    default:
      return state;
  }
};

export default appReducer;
