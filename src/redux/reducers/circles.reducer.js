import { combineReducers } from "redux";

const circleManuscriptsList = (state = [], action) => {
  switch (action.type) {
    case "SET_CIRCLE_MANUSCRIPTS_LIST":
      return action.payload;
    default:
      return state;
  }
};

const userManuscriptNotInCircle = (state = [], action) => {
  switch (action.type) {
    case "SET_USER_MANUSCRIPTS_NOT_IN_CIRCLE":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  circleManuscriptsList,
  userManuscriptNotInCircle,
});
