import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// * Get all base messages saga: fires on `FETCH_BASE_MESSAGES`
function* fetchBaseMessages() {
  try {
      // ask for base messages from db
      let messagesResponse = yield axios.get(`/api/messages`)
      // once received, send to messageBoard Reducer
      yield put({ type: 'SET_ALL_MESSAGES', payload: messagesResponse.data })
  } catch (err) {
      console.error('Error in fetchBaseMessages saga', err);
  }
}

// * Get children messages by parent_id, fires on `FETCH_CHILDREN`
function* fetchChildrenMessages(action) {
  try {
    // ask for children messages
    const response = yield axios.get(`/api/messages/${action.payload}`)
    // once received, send to messageBoard Reducer
    yield put({ type: 'ADD_CHILDREN_MESSAGES', payload: response.data })
  } catch (err) {
    console.error('Error in fetchChildrenMessages saga', err);
  }
}


// * Post a message: fires on `POST_MESSAGE`
function* postMessage(action) {
  try {
      yield axios.post(`/api/messages`, action.payload);
      yield put({
        type: "FETCH_BASE_MESSAGES",
      });
  } catch (error) {
    console.log("Error in POST Saga:", error);
  }
}


function* messagesSaga() {
  // GET
  yield takeEvery("FETCH_BASE_MESSAGES", fetchBaseMessages);
  yield takeLatest("FETCH_CHILDREN", fetchChildrenMessages);
  // POST
  yield takeEvery("POST_MESSAGE", postMessage);
}

export default messagesSaga;