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
        console.log("CREATE NEW NOTIFICATION", action.payload);
        yield axios.post("api/notification/new", action.payload);
        yield console.log("Successfully created new notification");
    } catch (error) {
        console.log("Error creating new notification", error);
    }
}

function* addUserToCircle(action) {
    try {
        console.log("ADD USER TO CIRCLE", action.payload);
        yield axios.post("/api/notification/add-member", action.payload);
        yield console.log("Successfully added member");
    } catch (error) {
        console.log("Error completing notification", error);
    }
}

function* updateNewCircleLeader(action) {
    try {
        yield axios.put("api/notification/new-leader", action.payload);
        yield console.log("Successfully updated circle leader");
    } catch (error) {
        console.log("Error adding user to circle", error);
    }
}

function* completeNotification(action) {
    try {
        console.log("COMPLETING NOTIFICATION", action.payload);
        yield axios.put(`/api/notification/complete/${action.payload}`);
        yield put({ type: "FETCH_NOTIFICATIONS" });
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
