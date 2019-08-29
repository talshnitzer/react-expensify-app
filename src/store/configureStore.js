import { createStore, combineReducers, applyMiddleware, compose } from 'redux'; //apply middleware lets you add middleware to your store. in order to use 'thunk' middleware
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk'; //lets us dispatch functions and async logic

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Store creation
export default () => {  //when we import the function, the default export from configureStore,
                        // we just call it, We get the store back and we can use it
const store = createStore(
    combineReducers({
        expenses: expensesReducer,   //create an object and put the array on the expenses property
        filters: filtersReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //configure of redux devtool before using middleware
    );
    return store;
};

