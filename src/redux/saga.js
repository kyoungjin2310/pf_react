import { takeLatest, all, put, fork, call } from "redux-saga/effects";
import { fetchFlickr, fetchYoutube, fetchMember, fetchNews } from "./api";
import * as types from "./actionType";

//flickr saga
export function* returnFlickr(action) {
  try {
    const response = yield call(fetchFlickr, action.Opt);
    console.log(response, types.FLICKR.start);
    yield put({ type: types.FLICKR.success, payload: response });
  } catch (err) {
    yield put({ type: types.FLICKR.err, payload: err });
  }
}
export function* callFlickr() {
  yield takeLatest(types.FLICKR.start, returnFlickr);
}

//youtube saga
export function* returnYoutube() {
  try {
    const response = yield call(fetchYoutube);
    yield put({ type: types.YOUTUBE.success, payload: response.data.items });
  } catch (err) {
    yield put({ type: types.YOUTUBE.err, payload: err });
  }
}
export function* callYoutube() {
  yield takeLatest(types.YOUTUBE.start, returnYoutube);
}

//members saga
export function* returnMember() {
  try {
    const response = yield call(fetchMember);
    console.log(response);
    yield put({ type: types.MEMBER.success, payload: response.data.members });
  } catch (err) {
    yield put({ type: types.MEMBER.err, payload: err });
  }
}
export function* callMember() {
  yield takeLatest(types.MEMBER.start, returnMember);
}

//news saga
export function* returnNews() {
  try {
    const response = yield call(fetchNews);
    console.log(response.data, "news");
    yield put({ type: types.NEWS.success, payload: response.data.news });
    console.log(response.data, "news2");
  } catch (err) {
    yield put({ type: types.NEWS.err, payload: err });
  }
}
export function* callNews() {
  yield takeLatest(types.NEWS.start, returnNews);
}

export default function* rootSaga() {
  yield all([
    fork(callFlickr),
    fork(callYoutube),
    fork(callMember),
    fork(callNews),
  ]);
}
