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


export default publicManuscriptList;
