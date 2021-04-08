import { takeLatest, put, call, take, fork, select } from 'redux-saga/effects';
import { ActionTypes } from './types';
import RequestManager, { ServiceConfigI } from '../../utils/request-manager';
import { UserDetailsI } from '../../utils/types';

function getUser() {
  return function* (action: any) {
    try {
      console.log(action);
      const requestManager = RequestManager.getInstance();

      requestManager.addServiceConfig({
        url: '/getuser',
        authReq: true,
        data: {},
      } as ServiceConfigI);

      const response: UserDetailsI = yield call(
        requestManager.perform.bind(requestManager)
      );

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
}

export default function* profileSaga() {
  yield takeLatest(ActionTypes.GET_USER, getUser());
}
