import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

/**
 * Fetches List of User Created Team For User Front Page
 */
function* fetchManuscriptList() {
    try {
        // console.log('in list of teams');
        const response = yield axios.get(`/manuscript`);
        yield put({ type: "SET_MANUSCRIPT_LIST", payload: response.data })

    } catch (error) {
        console.log("Get Manuscript List request failed in Saga", error);
    }
}

function* manuscriptListSaga() {
    yield takeLatest('FETCH_MANUSCRIPT_LIST', fetchManuscriptList);
}

export default manuscriptListSaga;