import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

/**
 * Fetches List of User's cirlces
 */
function* fetchMyJoinedCirclesList(action) {
  try {
    const id = action.payload;
    const response = yield axios.get(`api/circles/joined?id=${id}`);
    yield put({ type: "SET_MY_JOINED_CIRCLES_LIST", payload: response.data });
  } catch (error) {
    console.log("Get my joined cirlces list request failed in Saga", error);
  }
}

/**
 * Fetches List of User's created circles
 */
function* fetchMyCreatedCirclesList(action) {
  try {
    const id = action.payload;
    const response = yield axios.get(`api/circles/created?id=${id}`);
    yield put({ type: "SET_MY_CREATED_CIRCLES_LIST", payload: response.data });
  } catch (error) {
    console.log("Get my created cirlces list request failed in Saga", error);
  }
}

/**
 * Create User's new circle
 */
function* createNewCircle(action) {
  try {
    const data = JSON.stringify(action.payload); // convert to string
    yield axios.post("/api/circles", data, {
        headers: {
          "Content-Type": "application/json", //Setting the Content-Type header to "application/json" is important as it tells the server that the request payload is in JSON format and it needs to be parsed accordingly. Without this header, the server may try to parse the data in a different format and may result in errors.
        },
    });
    yield put({
      type: "FETCH_MY_CREATED_CIRCLES",
      payload: action.payload.ownerId,
    });
  } catch (error) {
    console.log("Create new circle request failed in saga", error);
  }
}

function* fetchAllPublicCirclesList(action) {
    try {
        const response = yield axios.get(`api/circles/public`);
        yield put({ type: "SET_PUBLIC_CIRCLES_LIST", payload: response.data });
      } catch (error) {
        console.log("Get all public cirlces list request failed in Saga", error);
      }
}



function* circlesSaga() {
  yield takeLatest("FETCH_MY_JOINED_CIRCLES", fetchMyJoinedCirclesList);
  yield takeLatest("FETCH_MY_CREATED_CIRCLES", fetchMyCreatedCirclesList);
  yield takeLatest('CREATE_NEW_CIRCLE', createNewCircle);
  yield takeLatest('FETCH_ALL_PUBLIC_CIRCLES', fetchAllPublicCirclesList)
}

export default circlesSaga;
