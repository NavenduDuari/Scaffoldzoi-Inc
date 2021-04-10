import { AxiosResponse } from 'axios';
import { takeLatest, put, call, take, fork, select } from 'redux-saga/effects';
import { ActionTypes } from './types';
import requestManager, {
  HttpMethod,
  ServiceConfigI,
} from '../../utils/request-manager';
import { Action, UserDetailsI } from '../../utils/types';
import { onReceiveRateChartAction, onReceiveUserAction } from './action';

function getUser() {
  return function* (action: Action<ActionTypes>) {
    try {
      console.log(action);

      requestManager.addServiceConfig({
        url: '/getuser',
        authReq: true,
        data: action.payload,
      } as ServiceConfigI);

      const serviceResponse: AxiosResponse = yield call(
        requestManager.perform.bind(requestManager)
      );

      const user = serviceResponse.data.data?.user;
      if (serviceResponse.status !== 200 && !user) {
        throw new Error('Request failed');
      }

      yield put(onReceiveUserAction(user));
    } catch (err) {
      console.error(err);
    }
  };
}

function insertRate() {
  return function* (action: Action<ActionTypes>) {
    try {
      console.log(action);

      requestManager.addServiceConfig({
        url: '/insertrate',
        method: HttpMethod.Post,
        authReq: true,
        data: action.payload,
      } as ServiceConfigI);

      const serviceResponse: AxiosResponse = yield call(
        requestManager.perform.bind(requestManager)
      );

      const rateChart = serviceResponse.data.data?.rateChart;
      if (serviceResponse.status !== 200 && !rateChart) {
        throw new Error('Request failed');
      }

      yield put(onReceiveRateChartAction(rateChart));
      console.log(serviceResponse);
    } catch (err) {
      console.error(err);
    }
  };
}

function getRateChart() {
  return function* (action: Action<ActionTypes>) {
    try {
      console.log(action);

      requestManager.addServiceConfig({
        url: '/getratechart',
        authReq: true,
        data: action.payload,
      } as ServiceConfigI);

      const serviceResponse: AxiosResponse = yield call(
        requestManager.perform.bind(requestManager)
      );

      const rateChart = serviceResponse.data.data?.rateChart;
      if (serviceResponse.status !== 200 && !rateChart) {
        throw new Error('Request failed');
      }

      yield put(onReceiveRateChartAction(rateChart));
      console.log(serviceResponse);
    } catch (err) {
      console.error(err);
    }
  };
}

function updateUser() {
  return function* (action: Action<ActionTypes>) {
    try {
      console.log(action);

      requestManager.addServiceConfig({
        url: '/updateuser',
        method: HttpMethod.Post,
        authReq: true,
        data: action.payload,
      } as ServiceConfigI);

      const serviceResponse: AxiosResponse = yield call(
        requestManager.perform.bind(requestManager)
      );

      const updatedUser = serviceResponse.data.data?.updatedUser;
      if (serviceResponse.status !== 200 && !updatedUser) {
        throw new Error('Request failed');
      }

      yield put(onReceiveUserAction(updatedUser));
      console.log(serviceResponse);
    } catch (err) {
      console.error(err);
    }
  };
}

export default function* profileSaga() {
  yield takeLatest(ActionTypes.GET_USER, getUser());
  yield takeLatest(ActionTypes.GET_RATE_CHART, getRateChart());
  yield takeLatest(ActionTypes.INSERT_RATE, insertRate());
  yield takeLatest(ActionTypes.UPDATE_USER, updateUser());
}
