import { all } from 'redux-saga/effects';
import profileSaga from './Containers/Profile/saga';
import appSaga from './Containers/App/saga';

export default function* rootSaga() {
  yield all([appSaga(), profileSaga()]);
}
