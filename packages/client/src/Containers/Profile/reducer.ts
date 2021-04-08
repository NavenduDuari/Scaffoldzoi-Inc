import { Action, UserDetailsI } from '../../utils/types';
import { ActionTypes, StoreStateI } from './types';

const INITIAL_STATE: StoreStateI = {
  userDetails: {} as UserDetailsI,
};

const profileReducer = (state = INITIAL_STATE, action: Action<ActionTypes>) => {
  switch (action.type) {
    case ActionTypes.ON_RECEIVE_USER:
      console.log('state :: updating userDetails');
      return {
        ...state,
        userDetails: action.payload?.user || {},
      };

    default:
      return state;
  }
};

export default profileReducer;
