import { all } from 'redux-saga/effects';

import tvshowSagas from "./tvshow/saga";

export default function* rootSaga(getState) {
  yield all([
    tvshowSagas()
  ]);
}
