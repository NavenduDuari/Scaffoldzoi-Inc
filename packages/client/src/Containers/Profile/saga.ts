import { AxiosResponse } from 'axios';
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

      const serviceResponse: AxiosResponse = yield call(
        requestManager.perform.bind(requestManager)
      );

      if (serviceResponse.status !== 200) {
        throw new Error('Request failed');
      }

      console.log(serviceResponse);
    } catch (err) {
      console.error(err);
    }
  };
}

export default function* profileSaga() {
  yield takeLatest(ActionTypes.GET_USER, getUser());
}
