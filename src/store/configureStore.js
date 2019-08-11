import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

//Store creation
export default () => {  //when we import the function, the default export from configureStore,
                        // we just call it, We get the store back and we can use it
const store = createStore(
    combineReducers({
        expenses: expensesReducer,   //create an object and put the array on the expenses property
        filters: filtersReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
};

