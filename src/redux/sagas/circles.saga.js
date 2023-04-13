import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchMyJoinedCirclesList(action) {
  try {
    const id = action.payload;
    const response = yield axios.get(`api/circles/joined?id=${id}`);
    yield put({ type: "SET_MY_JOINED_CIRCLES_LIST", payload: response.data });
  } catch (error) {
    console.log("Get my joined cirlces list request failed in Saga", error);
  }
}

function* fetchMyCreatedCirclesList(action) {
  try {
    const id = action.payload;
    const response = yield axios.get(`api/circles/created?id=${id}`);
    yield put({ type: "SET_MY_CREATED_CIRCLES_LIST", payload: response.data });
  } catch (error) {
    console.log("Get my created cirlces list request failed in Saga", error);
  }
}

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

function* fetchCircleManuscriptsList(action) {
  console.log('action.payload}', action.payload)
  try {
    const id = action.payload;
    const response = yield axios.get(`/api/circles/manuscript?id=${id}`);
    yield put({ type: "SET_CIRCLE_MANUSCRIPTS_LIST", payload: response.data });
  } catch (error) {
    console.log("Get circle manuscripts list request failed in Saga", error);
  }
}

function* fetchUserManuscriptsNotInCircle(action) {
  console.log('action.payload}', action.payload)
  try {
    const id = action.payload;
    const response = yield axios.get(`/api/circles/userManuscriptNotInCircle?id=${id}`);
    const manuscripts = response.data;
    yield put({ type: "SET_USER_MANUSCRIPTS_NOT_IN_CIRCLE", payload: response.data });
    if (action.callback) {
      action.callback(manuscripts);
    }
  } catch (error) {
    console.log("Get all of user's manuscripts list in circle request failed in Saga", error);
  }
}


function* createCircleManuscript(action) {
  console.log('action.payload====', action.payload)
  try {
    const data = JSON.stringify(action.payload); // convert to string
    yield axios.post("/api/circles/createCircleManuscript", data, {
        headers: {
          "Content-Type": "application/json", //Setting the Content-Type header to "application/json" is important as it tells the server that the request payload is in JSON format and it needs to be parsed accordingly. Without this header, the server may try to parse the data in a different format and may result in errors.
        },
    });
    yield put({
      type: "FETCH_CIRCLE_MANUSCRIPTS_LIST",
      payload: action.payload.circle_id,
    });
  } catch (error) {
    console.log("Create new circle manuscript request failed in saga", error);
  }
}

function* circlesSaga() {
  yield takeLatest("FETCH_MY_JOINED_CIRCLES", fetchMyJoinedCirclesList);
  yield takeLatest("FETCH_MY_CREATED_CIRCLES", fetchMyCreatedCirclesList);
  yield takeLatest('CREATE_NEW_CIRCLE', createNewCircle);
  yield takeLatest('FETCH_ALL_PUBLIC_CIRCLES', fetchAllPublicCirclesList)
  yield takeLatest('FETCH_CIRCLE_MANUSCRIPTS_LIST', fetchCircleManuscriptsList);
  yield takeLatest('FETCH_USER_MANUSCRIPTS_NOT_IN_CIRCLE', fetchUserManuscriptsNotInCircle);
  yield takeLatest('CREATE_CIRCLE_MANUSCRIPT', createCircleManuscript);


}

export default circlesSaga;
