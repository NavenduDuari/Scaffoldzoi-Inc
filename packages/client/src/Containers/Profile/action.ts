import { ActionTypes } from './types';
import { Action } from '../../utils/types';

export const getUserAction = (): Action<ActionTypes> => ({
  type: ActionTypes.GET_USER,
  payload: null,
});
