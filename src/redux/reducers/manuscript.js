import { combineReducers } from "redux";

const manuscriptDetails = (state = {}, action) => {
  switch (action.type) {
    case "SET_MANUSCRIPT":
      return action.payload;
    case "CLEAR_MANUSCRIPT":
      return {};
    default:
      return state;
  }
};

const publicManuscriptList = (state = [], action) => {
  switch (action.type) {
    case "SET_PUBLIC_MANUSCRIPT_LIST":
      return action.payload;
    case "CLEAR_PLUBLIC_MANUSCRIPT_LIST":
      return [];
    default:
      return state;
  }
};

const writersDeskManuscriptList = (state = [], action) => {
  switch (action.type) {
    case "SET_WRITERS_DESK_LIST":
      return action.payload;
    case "CLEAR_WRITERS_DESK_LIST":
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  manuscriptDetails,
  publicManuscriptList,
  writersDeskManuscriptList,
});
