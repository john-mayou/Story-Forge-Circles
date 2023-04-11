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
  
  
  export default writersDeskManuscriptList;
  