import { combineReducers } from "redux";

const myJoinedCircleList = (state = [], action) => {
  switch (action.type) {
    case "SET_MY_JOINED_CIRCLES_LIST":
      return action.payload;
    default:
      return state; 
  }
};

const myCreatedCircleList = (state = [], action) => {
  switch (action.type) {
    case "CREATE_NEW_CIRCLE":
      return [...state, action.payload];
    case "CLEAR_MY_CIRCLES_LIST":
      return [];
    case "SET_MY_CREATED_CIRCLES_LIST":
      return action.payload;
    default:
      return state; 
  }
};

const allPublicCirclesList = (state = [], action) => {
  switch (action.type) {
    case "SET_PUBLIC_CIRCLES_LIST": 
      return action.payload;
    default: 
      return state; 
  }
};

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
  myJoinedCircleList,
  myCreatedCircleList,
  allPublicCirclesList,
  circleManuscriptsList,
  userManuscriptNotInCircle,
});