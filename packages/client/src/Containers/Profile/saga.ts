import { AxiosResponse } from 'axios';
import { takeLatest, put, call, take, fork, select } from 'redux-saga/effects';
import { ActionTypes } from './types';
import requestManager, { ServiceConfigI } from '../../utils/request-manager';
import { Action, UserDetailsI } from '../../utils/types';
import { onReceiveUserAction } from './action';

function getUser() {
  return function* (action: Action<ActionTypes>) {
    try {
      console.log(action);

      requestManager.addServiceConfig({
        url: '/getuser',
        authReq: true,
        data: {
          email: action.payload?.email,
        },
      } as ServiceConfigI);

      const serviceResponse: AxiosResponse = yield call(
        requestManager.perform.bind(requestManager)
      );

      const user = serviceResponse.data.data?.user;
      if (serviceResponse.status !== 200 && !user) {
        throw new Error('Request failed');
      }

      yield put(onReceiveUserAction(user));
      console.log(serviceResponse);
    } catch (err) {
      console.error(err);
    }
  };
}

export default function* profileSaga() {
  yield takeLatest(ActionTypes.GET_USER, getUser());
}
