export default (state = {}, action) => {    //the default state object - add a property onto that object when the user is logged in, and we will wipe that object back to an empty object when the user logs out.
    switch (action.type) {
        case 'LOGIN':
            return {                        //return the new state
                uid: action.uid
            };
        case 'LOGOUT':
            return{};
        default:
            return state;
    }
};