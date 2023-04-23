import { put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// * Get all base messages saga: fires on `FETCH_BASE_MESSAGES`
function* fetchBaseMessages(action) {
  try {
      // ask for base messages from db
      let messagesResponse = yield axios.get(`/api/messages/${action.payload}`)
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
    const response = yield axios.get(`/api/messages/children/${action.payload}`)
    // once received, send to messageBoard Reducer
    yield put({ type: 'ADD_CHILDREN_MESSAGES', payload: response.data })
  } catch (err) {
    console.error('Error in fetchChildrenMessages saga', err);
  }
}

// * Select user reducer to access username
const userSelector = (state) => state.user;

// * Post a message: fires on `POST_MESSAGE`
function* postMessage(action) {
  try {
    const response = yield axios.post(`/api/messages`, action.payload);
    const user = yield select(userSelector)
    response.data.username = user.username;
    response.data.avatar_image = user.avatar_image
    if (response.data.parent_id) {
      yield put({
        type: "ADD_CHILDREN_MESSAGES",
        payload: [response.data]
      });
    } else {
      yield put({
        type: "ADD_BASE_MESSAGE",
        payload: response.data
      });
    }
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