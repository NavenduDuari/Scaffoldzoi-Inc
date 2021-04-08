import { ActionTypes } from './types';
import { Action, UserDetailsI } from '../../utils/types';

export const getUserAction = (email: string): Action<ActionTypes> => ({
  type: ActionTypes.GET_USER,
  payload: {
    email,
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
