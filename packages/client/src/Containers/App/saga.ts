import { takeLatest, put, call, take, fork, select } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import RequestManager, {
  HttpMethod,
  ServiceConfigI,
} from '../../utils/request-manager';
import { ActionTypes } from './types';
import { LocalStorageKey } from '../../utils/types';

function performAuth() {
  return function* (action: any) {
    try {
      console.log(action);
      const requestManager = RequestManager.getInstance();

      requestManager.addServiceConfig({
        url: '/login',
        method: HttpMethod.Post,
        authReq: false,
        data: action.payload,
      } as ServiceConfigI);

      const serviceResponse: AxiosResponse = yield call(
        requestManager.perform.bind(requestManager)
      );

      const { token } = serviceResponse.data.data;

      if (serviceResponse.status !== 200 && !token) {
        throw new Error('request failed');
      }

      localStorage.setItem(LocalStorageKey.Token, token);

      requestManager.addToken(token);

      const r = localStorage.getItem(LocalStorageKey.Token);

      console.log(r);
    } catch (err) {
      console.error(err);
    }
  };
}

export default function* appSaga() {
  yield takeLatest(ActionTypes.PERFORM_AUTH, performAuth());
}
