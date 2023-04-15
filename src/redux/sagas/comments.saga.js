import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Get all saga: fires on `FETCH_COMMENTS`
function* fetchComments() {
  try {
      // ask for comment data from db
      let commentsResponse = yield axios.get(`/api/comments`)
      // once received, send to comments Reducer
      yield put({ type: 'SET_COMMENTS', payload: commentsResponse.data })
  } catch (err) {
      console.error('Error in fetchComments comments saga', err);
  }
}

// Post a message: fires on `POST_COMMENT`
function* postComment(action) {
    try {
        yield axios.post(`/api/comments`, action.payload);
        yield put({
          type: "FETCH_COMMENTS",
        });
      } catch (error) {
        console.log("Error in POST comments Saga:", error);
      }

}


function* commentsSaga() {
  yield takeEvery("POST_COMMENT", postComment);
  yield takeEvery("FETCH_COMMENTS", fetchComments);
}

export default commentsSaga;