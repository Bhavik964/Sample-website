
import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import dashboardSaga from './dashboardSaga';
import otpSaga from './otpSaga';
import territorySaga from './territorySaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    dashboardSaga(),
    otpSaga(),
    territorySaga(),
  ]);
}
