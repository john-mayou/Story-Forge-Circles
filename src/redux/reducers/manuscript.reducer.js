const manuscriptList = (state = [], action) => {
  switch (action.type) {
    case "SET_MANUSCRIPT_LIST":
      return action.payload;
    case "ADD_MANUSCRIPT":
      return [...state, action.payload];
    case "CLEAR_TEAM_LIST":
      return [];
    default:
      return state;
  }
};

export default manuscriptList;
