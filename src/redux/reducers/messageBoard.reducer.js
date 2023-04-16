
const messages = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_MESSAGES':
            return action.payload;
        case 'ADD_CHILDREN_MESSAGES':
            // creating new array
            let newArr = [];
            // looping through current messages
            for (let i = 0; i < state.length; i++) {
                // checking if id of current message = parent_id of first child
                if (state[i].id === action.payload[0].parent_id) {
                    // spreading new array, adding current message, adding all child messages
                    newArr = [...newArr, state[i], ...action.payload];
                    // otherwise push current message to new array
                } else {
                    newArr.push(state[i]);
                }
            }
            return newArr;
        default:
            return state;
    }
}

export default messages;