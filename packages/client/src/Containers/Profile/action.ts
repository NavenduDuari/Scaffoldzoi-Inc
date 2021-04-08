import { ActionTypes } from './types';
import { Action } from '../../utils/types';

export const getUserAction = (email: string): Action<ActionTypes> => ({
  type: ActionTypes.GET_USER,
  payload: {
    email,
  },
});
