const initialState = {
    sharedManuscripts: []
};

const circleManuscriptList = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SHARED_MANUSCRIPT_LIST":
      return { ...state, sharedManuscripts: action.payload };
    default:
      return state;
  }
};

export default circleManuscriptList;