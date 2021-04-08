import { Action } from '../../utils/types';
import { ActionTypes, StoreStateI } from './types';

const INITIAL_STATE: StoreStateI = {
  token: '',
};

const appReducer = (state = INITIAL_STATE, action: Action<ActionTypes>) => {
  switch (action.type) {
    case ActionTypes.ON_LOAD_LOCAL_TOKEN:
      return {
        ...state,
        token: action.payload?.token,
      };

    default:
      return state;
  }
};

export default appReducer;
