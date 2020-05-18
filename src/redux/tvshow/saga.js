import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  searchAPI,
  getShowAPI,
  getCastAPI,
  getCrewAPI,
} from "../../services/axios/api";

import { TVSHOW_LIST, TVSHOW_GET } from "Constants/actionTypes";

import { tvshowListSuccess, tvshowGetSuccess } from "./actions";

const getTvShowListAsync = async (search) =>
  await searchAPI(search)
    .then((res) => res)
    .catch((error) => error);

function* getTvShowList({ payload }) {
  const { search } = payload;
  try {
    const res = yield call(getTvShowListAsync, search);
    if (res.status === 200) {
      yield put(tvshowListSuccess(res.data));
    }
  } catch (error) {
    // catch throw
    console.log("error : ", error);
  }
}

const getTvShowGetAsync = async (id) =>
  await getShowAPI(id)
    .then((res) => res)
    .catch((error) => error);

const getTvShowCrewAsync = async (id) =>
  await getCrewAPI(id)
    .then((res) => res)
    .catch((error) => error);

const getTvShowCastAsync = async (id) =>
  await getCastAPI(id)
    .then((res) => res)
    .catch((error) => error);

function* getTvShowGet({ payload }) {
  const { id, callback } = payload;
  try {
    const showRes = yield call(getTvShowGetAsync, id);
    const castRes = yield call(getTvShowCastAsync, id);
    const crewRes = yield call(getTvShowCrewAsync, id);

    if (showRes.status === 200) {
      const cast = castRes.status === 200 ? castRes.data : [];
      const crew = crewRes.status === 200 ? crewRes.data : [];
      callback(showRes.data, cast, crew);
      yield put(tvshowGetSuccess());
    }
  } catch (error) {
    // catch throw
    console.log("error : ", error);
  }
}

export function* watchTvShowList() {
  yield takeEvery(TVSHOW_LIST, getTvShowList);
}

export function* watchTvShowGet() {
  yield takeEvery(TVSHOW_GET, getTvShowGet);
}

export default function* rootSaga() {
  yield all([fork(watchTvShowList), fork(watchTvShowGet)]);
}
