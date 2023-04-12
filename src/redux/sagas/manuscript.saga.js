import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

/**
 * Fetches List of User Created Team For User Front Page
 */
function* fetchPublicManuscriptList() {
  try {
    // console.log('in list of teams');
    const response = yield axios.get(`/manuscript`);
    yield put({ type: "SET_PUBLIC_MANUSCRIPT_LIST", payload: response.data });
  } catch (error) {
    console.log("Get Manuscript List request failed in Saga", error);
  }
}

function* fetchWritersDeskList() {
  try {
    // console.log('in list of teams');
    const response = yield axios.get(`/manuscript/writersdesk`);
    yield put({ type: "SET_WRITERS_DESK_LIST", payload: response.data });
  } catch (error) {
    console.log("Get Manuscript List request failed in Saga", error);
  }
}

function* addManuscript(action) {
  try {
    yield axios.post("/manuscript", action.payload);
    yield put({ type: "FETCH_WRITERS_DESK_LIST" });
  } catch (error) {
    console.log("add manuscript error in saga", error);
  }
}

function* removeManuscript(action) {
  try {
    yield axios.delete(`/manuscript/${action.payload}`);
    yield put({ type: "FETCH_WRITERS_DESK_LIST" });
  } catch (error) {
    console.log("remove manuscript error in saga", error);
  }
}

function* updateManuscript(action) {
  try {
    yield axios.put(`/manuscript/${action.payload.id}`, {
      payload: { title: action.payload.title, body: action.payload.body },
    });
    //yield put({ type: "FETCH_MANUSCRIPT" });
  } catch (error) {
    console.log("Update Manuscript PUT request failed", error);
  }
}

function* publicManuscriptListSaga() {
  yield takeLatest("FETCH_PUBLIC_MANUSCRIPT_LIST", fetchPublicManuscriptList);
  yield takeLatest("FETCH_WRITERS_DESK_LIST", fetchWritersDeskList);
  yield takeLatest("ADD_MANUSCRIPT", addManuscript);
  yield takeLatest("REMOVE_MANUSCRIPT", removeManuscript);
  yield takeLatest("UPDATE_MANUSCRIPT", updateManuscript);
}

export default publicManuscriptListSaga;
