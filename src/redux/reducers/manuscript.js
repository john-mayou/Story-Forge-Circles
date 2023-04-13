const manuscript = (state = {}, action) => {
    switch (action.type) {
      case "SET_MANUSCRIPT":
        return action.payload;
      case "CLEAR_MANUSCRIPT":
        return {};
      default:
        return state;
    }
  };
  
  
  export default manuscript;