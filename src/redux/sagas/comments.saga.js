import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Get all saga: fires on `FETCH_COMMENTS`
function* fetchComments() {
  try {
      // ask for comment data from db
      let commentsResponse = yield axios.get(`/api/messages`)
      // once received, send to plantsReducer
      yield put({ type: 'SET_COMMENTS', payload: commentsResponse.data })
  } catch (err) {
      console.error('Error in fetchComments comments saga', err);
  }
}

function* postComments(action) {
    try {
        yield axios.post(`/api/messages`, action.payload);
        yield put({
          type: "FETCH_NEW_COMMENT",
        });
      } catch (error) {
        console.log("Error in POST Saga:", error);
      }

}


function* commentsSaga() {
  yield takeEvery("POST_COMMENT", postComments);
  yield takeEvery("FETCH_COMMENTS", fetchComments);
}

export default commentsSaga;