import { all } from 'redux-saga/effects';
import profileSaga from './Containers/Profile/saga';

export default function* rootSaga() {
  yield all([profileSaga()]);
}
