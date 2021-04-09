import { takeLatest, put, call, take, fork, select } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import requestManager, {
  HttpMethod,
  ServiceConfigI,
} from '../../utils/request-manager';
import { ActionTypes } from './types';
import { LocalStorageKey, Action } from '../../utils/types';
import { onLoadLocalTokenAction } from './action';

function performAuth() {
  return function* (action: Action<ActionTypes>) {
    try {
      console.log(action);

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

      requestManager.addToken.call(requestManager, token);
      yield put(onLoadLocalTokenAction(token));

      const r = localStorage.getItem(LocalStorageKey.Token);

      console.log(r);
    } catch (err) {
      console.error(err);
    }
  };
}

function loadLocalToken() {
  return function* (action: Action<ActionTypes>) {
    const token = localStorage.getItem(LocalStorageKey.Token) || '';
    requestManager.addToken.call(requestManager, token);
    console.log('loaded token from local');
    yield put(onLoadLocalTokenAction(token));
  };
}

function getAllSellers() {
  return function* (action: Action<ActionTypes>) {
    try {
      console.log(action);

      requestManager.addServiceConfig({
        url: '/getallsellers',
        method: HttpMethod.Get,
        authReq: true,
      } as ServiceConfigI);

      const serviceResponse: AxiosResponse = yield call(
        requestManager.perform.bind(requestManager)
      );

      const { token } = serviceResponse.data.data;

      if (serviceResponse.status !== 200 && !token) {
        throw new Error('request failed');
      }

      console.log(serviceResponse);
    } catch (err) {
      console.error(err);
    }
  };
}

function logOut() {
  return function* (action: Action<ActionTypes>) {
    localStorage.removeItem(LocalStorageKey.Token);
    requestManager.addToken.call(requestManager, '');
    yield put(onLoadLocalTokenAction(''));
  };
}

export default function* appSaga() {
  yield takeLatest(ActionTypes.PERFORM_AUTH, performAuth());
  yield takeLatest(ActionTypes.LOAD_LOCAL_TOKEN, loadLocalToken());
  yield takeLatest(ActionTypes.GET_ALL_SELLERS, getAllSellers());
  yield takeLatest(ActionTypes.LOG_OUT, logOut());
}
