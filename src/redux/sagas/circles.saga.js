import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

/**
 * Fetches List of User's cirlces
 */
function* fetchMyJoinedCirclesList(action) {

    try {
        const id = action.payload;
        const response = yield axios.get(`api/circles/joined?id=${id}`);
        yield put({ type: "SET_MY_JOINED_CIRCLES_LIST", payload:  response.data  })

    } catch (error) {
        console.log("Get my joined cirlces list request failed in Saga", error);
    }
}

function* fetchMyCreatedCirclesList(action) {

    try {
        const id = action.payload;
        const response = yield axios.get(`api/circles/created?id=${id}`);
        yield put({ type: "SET_MY_CREATED_CIRCLES_LIST", payload:  response.data  })

    } catch (error) {
        console.log("Get my created cirlces list request failed in Saga", error);
    }
}

function* circlesSaga() {
    yield takeLatest('FETCH_MY_JOINED_CIRCLES', fetchMyJoinedCirclesList);
    yield takeLatest('FETCH_MY_CREATED_CIRCLES', fetchMyCreatedCirclesList);

}

export default circlesSaga;