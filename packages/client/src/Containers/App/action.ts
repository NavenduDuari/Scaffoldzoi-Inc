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

export const loadLocalTokenAction = (): Action<ActionTypes> => ({
  type: ActionTypes.LOAD_LOCAL_TOKEN,
});

export const onLoadLocalTokenAction = (token: string): Action<ActionTypes> => ({
  type: ActionTypes.ON_LOAD_LOCAL_TOKEN,
  payload: {
    token,
  },
});
