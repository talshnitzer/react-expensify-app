import { createStore} from 'redux';

//action generators are functions that return action objects
//if input object doesn't exist we default it to an empty object
//if increment by not use one.
//incrementBy - set equal to 1 If there's an object provided and it doesn't include 'incrementBy'.
//if there is no object provided the default is going to be an empty object.
//when we try to destructor that empty object there's no increment by.
//So the end result once again is 1.

const incrementCount = ({ incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({count = 0} = {}) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});

//Reducers
//1. Reducers are pure functions
//2. Never change state or action

const countReducer = ((state = {count: 0}, action) => { 
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                count: 0
            }
        default: 
            return state;
    }
});
       
const store = createStore(countReducer);

// const store = createStore((state = {count: 0}, action) => { //1st arg to createStore needs to be a function
//                                             //the 1st argument to the function that we passed to createStore is the current state.
//                                             //no constructor function to set up a default.
//                                             //set here state equal to the default state object.
//     switch (action.type) {
//         case 'INCREMENT':
//             return {
//                 count: state.count + action.incrementBy
//             };
//         case 'DECREMENT':
//             return {
//                 count: state.count - action.decrementBy
//             };
//         case 'SET':
//             return {
//                 count: action.count
//             };
//         case 'RESET':
//             return {
//                 count: 0
//             }
//         default: 
//             return state;
//     }
// });

const unsubscribe = store.subscribe(() => { //this function gets called every time the store changes
    console.log(store.getState()); //the return value from subscribe is a function we can call to unsubscribe.
})

//action is an object that gets sent to the store and describesthe type of action.
//increment, decrement, reset

// I'd like to increment the count.
// store.dispatch({
//         type: 'INCREMENT', //upper case is a convevsion
//         incrementBy: 5
//     }); //store.dispatch send off an action object.And the store can do something with this information.

store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());

// store.dispatch({
//     type: 'RESET' //upper case is a convevsion
// });

store.dispatch(resetCount());
store.dispatch(decrementCount());
store.dispatch(decrementCount({decrementBy: 10}));
store.dispatch(setCount({count: -100}));

