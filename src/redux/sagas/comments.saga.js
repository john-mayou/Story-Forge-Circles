import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


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
}

export default commentsSaga;