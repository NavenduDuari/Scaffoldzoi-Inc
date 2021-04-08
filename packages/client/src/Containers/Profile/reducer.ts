import { UserDetailsI } from '../../utils/types';
import { ActionTypes, StoreStateI } from './types';

const INITIAL_STATE: StoreStateI = {
  userDetails: {} as UserDetailsI,
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ActionTypes.GET_USER:
      return {
        ...state,
        userDetails: {},
      };

    default:
      return state;
  }
};

export default reducer;
