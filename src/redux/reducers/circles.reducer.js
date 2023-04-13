const initialState = {
  myJoinedCircleList: [],
  myCreatedCircleList: [],
  allPublicCirclesList: [],
  circleManuscriptsList: [],
  userManuscriptNotInCircle: []
};

const circles = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MY_JOINED_CIRCLES_LIST":
      return {
        ...state,
        myJoinedCircleList: action.payload,
      };
    case "CREATE_NEW_CIRCLE":
      return {
        ...state,
        myCreatedCricleList: [...state.myCreatedCircleList, action.payload],
      };
    case "CLEAR_MY_CIRCLES_LIST":
      return [];
    case "SET_MY_CREATED_CIRCLES_LIST":
      return {
        ...state,
        myCreatedCircleList: action.payload,
      };
      case "SET_PUBLIC_CIRCLES_LIST":
        return {
          ...state,
          allPublicCirclesList: action.payload,
        };
        case "SET_CIRCLE_MANUSCRIPTS_LIST":
          return { ...state, circleManuscriptsList: action.payload };
          case "SET_USER_MANUSCRIPTS_NOT_IN_CIRCLE":
            return { ...state, userManuscriptNotInCircle: action.payload };  
    default:
      return state;
  }
};

export default circles;
