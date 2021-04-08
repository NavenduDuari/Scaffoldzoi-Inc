import { ActionTypes } from './types';
import { Action } from '../../utils/types';

export const performAuthAction = (
  email: string,
  password: string
): Action<ActionTypes> => ({
  type: ActionTypes.PERFORM_AUTH,
  payload: {
    email,
    password,
  },
});
