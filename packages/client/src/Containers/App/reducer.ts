import { Action } from '../../utils/types';
import { ActionTypes, StoreStateI, TokenStatus } from './types';

const INITIAL_STATE: StoreStateI = {
  token: '',
  tokenStatus: TokenStatus.YetToFetch,
};

const appReducer = (state = INITIAL_STATE, action: Action<ActionTypes>) => {
  switch (action.type) {
    case ActionTypes.ON_LOAD_LOCAL_TOKEN:
      console.log('reducer :: ', action);
      return {
        ...state,
        token: action.payload?.token,
        tokenStatus: TokenStatus.Fetched,
      };

    default:
      return state;
  }
};

export default appReducer;
