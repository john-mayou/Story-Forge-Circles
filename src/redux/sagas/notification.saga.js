import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* fetchNotifications() {
    try {
    } catch (error) {
        console.log("Error fetching notifications", error);
    }
}

function* createNewNotification(action) {
    try {
    } catch (error) {
        console.log("Error creating new notification", error);
    }
}

function* addUserToCircle(action) {
    try {
    } catch (error) {
        console.log("Error completing notification", error);
    }
}

function* updateNewCircleLeader(action) {
    try {
    } catch (error) {
        console.log("Error adding user to circle", error);
    }
}

function* completeNotification(action) {
    try {
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
