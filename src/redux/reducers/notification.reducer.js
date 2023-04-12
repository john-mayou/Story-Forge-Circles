const notifications = (state = [], action) => {
    switch (action.type) {
        case "SET_NOTIFICATIONS":
            return action.payload;
        case "UNSET_NOTIFICATIONS":
            return [];
        default:
            return state;
    }
};

// user will be on the redux state at:
// state.user
export default notifications;
