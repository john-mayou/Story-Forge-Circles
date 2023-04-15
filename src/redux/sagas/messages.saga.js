import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Get all saga: fires on `FETCH_MESSAGES`
function* fetchMessages() {
  try {
      // ask for comment data from db
      let messagesResponse = yield axios.get(`/api/messages`)
      // once received, send to messageBoard Reducer
      yield put({ type: 'SET_ALL_MESSAGES', payload: messagesResponse.data })
  } catch (err) {
      console.error('Error in fetchMessages saga', err);
  }
}

// Post a message: fires on `POST_MESSAGE`
function* postMessage(action) {
    try {
        yield axios.post(`/api/messages`, action.payload);
        yield put({
          type: "FETCH_MESSAGES",
        });
      } catch (error) {
        console.log("Error in POST Saga:", error);
      }

}


function* messagesSaga() {
  yield takeEvery("POST_MESSAGE", postMessage);
  yield takeEvery("FETCH_MESSAGES", fetchMessages);
}

export default messagesSaga;