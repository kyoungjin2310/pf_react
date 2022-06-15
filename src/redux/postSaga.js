import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import {
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_SUCCESS,
  POSTS_LOADING_REQUEST,
  POST_UPLOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
  POST_UPLOADING_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_EDIT_LOADING_SUCCESS,
  POST_EDIT_LOADING_FAILURE,
  POST_EDIT_UPLOADING_SUCCESS,
  POST_EDIT_UPLOADING_FAILURE,
  POST_EDIT_UPLOADING_REQUEST,
  POST_EDIT_LOADING_REQUEST,
} from "./types";
import { fetchNews, fetchLocalGet, fetchLocalSet } from "./api";

function* loadPosts(action) {
  try {
    const response = yield call(fetchNews, action.payload);
    console.log(response, "loadPosts");
    yield put({
      type: POSTS_LOADING_SUCCESS,
      payload: response.data.news,
    });
  } catch (e) {
    yield put({
      type: POSTS_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchLoadPosts() {
  yield takeEvery(POSTS_LOADING_REQUEST, loadPosts);
}

function* uploadPosts(action) {
  try {
    console.log(action, "uploadPost function");
    const response = yield call(fetchLocalSet, action.payload);
    console.log(response, "uploadPostAPI, action.payload");
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: response.data.news,
    });
  } catch (e) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchuploadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts);
}

function* loadPostDetail(action) {
  try {
    console.log(action);
    const response = yield call(fetchLocalGet, action.payload);
    console.log(response, "post_detail_saga_data");
    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: response.data.news,
    });
  } catch (e) {
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchloadPostDetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostDetail);
}

function* DeletePost(action) {
  try {
    const response = yield call(fetchLocalSet, action.payload);
    yield put({
      type: POST_DELETE_SUCCESS,
      payload: response.data.news,
    });
  } catch (e) {
    yield put({
      type: POST_DELETE_FAILURE,
      payload: e,
    });
  }
}

function* watchDeletePost() {
  yield takeEvery(POST_DELETE_REQUEST, DeletePost);
}

function* PostEditLoad(action) {
  try {
    const response = yield call(fetchLocalGet, action.payload);
    yield put({
      type: POST_EDIT_LOADING_SUCCESS,
      payload: response.data.news,
    });
  } catch (e) {
    yield put({
      type: POST_EDIT_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchPostEditLoad() {
  yield takeEvery(POST_EDIT_LOADING_REQUEST, PostEditLoad);
}

function* PostEditUpload(action) {
  try {
    const response = yield call(fetchLocalSet, action.payload);
    yield put({
      type: POST_EDIT_UPLOADING_SUCCESS,
      payload: response.data.news,
    });
  } catch (e) {
    yield put({
      type: POST_EDIT_UPLOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchPostEditUpload() {
  yield takeEvery(POST_EDIT_UPLOADING_REQUEST, PostEditUpload);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchuploadPosts),
    fork(watchloadPostDetail),
    fork(watchDeletePost),
    fork(watchPostEditLoad),
    fork(watchPostEditUpload),
  ]);
}
