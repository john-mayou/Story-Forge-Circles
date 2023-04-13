import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchSharedManuscripts(action) {
  try {
    const response = yield axios.get(`/manuscript/shared/${action.payload}`);
    yield put({ type: "SET_SHARED_MANUSCRIPTS", payload: response.data });
  } catch (error) {
    console.log("Get shared manuscripts request failed in Saga", error);
  }
}

function* sharedManuscriptListSaga() {
  yield takeLatest('FETCH_SHARED_MANUSCRIPTS', fetchSharedManuscripts);
}

export default sharedManuscriptListSaga;
