import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* fetchNotifications() {
  try {
    const notificationsResult = yield axios.get("/api/notification");
    yield put({
      type: "SET_NOTIFICATIONS",
      payload: notificationsResult.data,
    });
  } catch (error) {
    console.log("Error fetching notifications", error);
  }
}

function* createNewNotification(action) {
  try {
    yield axios.post("api/notification/new", action.payload);
  } catch (error) {
    console.log("Error creating new notification", error);
  }
}

function* addUserToCircle(action) {
  try {
    yield axios.post("/api/notification/add-member", action.payload);
  } catch (error) {
    console.log("Error completing notification", error);
  }
}

function* updateNewCircleLeader(action) {
  try {
    yield axios.put("api/notification/new-leader", action.payload);
  } catch (error) {
    console.log("Error adding user to circle", error);
  }
}

function* completeNotification(action) {
  try {
    yield axios.put(`/api/notification/complete/${action.payload}`);
    yield put({ type: "FETCH_NOTIFICATIONS" });
    yield put({ type: "FETCH_USER" });
  } catch (error) {
    console.log("Error update new circle leader", error);
  }
}

function* notificationSaga() {
  // GET
  yield takeEvery("FETCH_NOTIFICATIONS", fetchNotifications);

  // POST
  yield takeEvery("CREATE_NEW_NOTIFICATION", createNewNotification);
  yield takeEvery("ADD_USER_TO_CIRCLE", addUserToCircle);

  // PUT
  yield takeEvery("UPDATE_NEW_CIRCLE_LEADER", updateNewCircleLeader);
  yield takeEvery("COMPLETE_NOTIFICATION", completeNotification);

  // DELETE
}

export default notificationSaga;
