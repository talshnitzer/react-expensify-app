import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//the final state - static object that represents the things we want to keep track of.

// ADD_EXPENSE
const addExpense = (
    { 
        description  = '', 
        note = '', 
        amount = 0, 
        createdAt = 0
    } = {}
    ) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});
// EDIT_EXPENSE
const editExpense = (id, updates) => ({   //arguments ID and updates, neither of which need defaults if you don't
                                        //have the ID and you're not updating anything there's no need to call it.
                                        //And then we'll implicitly return an object.
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET_TEXT_FILTER

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE

const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

//Expense Reducer

const expensesReducerDefaultState = [];

const expensesReducer  = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            //return state.filter(expense => expense.id !== action.expense.id);
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return{                        //return a new object changing something:
                        ...expense,                 //grab all of its existing properties.
                        ...action.updates           //override any of the ones that were passed down in 'action.updates' and that's the new value for that expense                  
                    };
                } else {
                    return expense;
                }
            })
        default:
            return state;
    }
};

// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState , action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default: 
            return state;
    }
};

//Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => { //destructurin the filters object
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1; //1=> b comes first, -1=>a comes first
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1 ;
        }
    });
};
//Store creation

// call combineReducers as a function:
// combineReducers takes an argument, an object, on this object we're going to provide key value pairs.
// The key is the root state name and the value is the reducer that's manage that.

const store = createStore(
    combineReducers({
        expenses: expensesReducer,   //create an object and put the array on the expenses property
        filters: filtersReducer
    })
    );

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
})

//The action with the type ADD_EXPENSE is dispatched to both reducers.
//we set up the case for the reducers that actually need to do something
//when addExpense gets dispatched. does the expenses reducer need to do anything?
//Yes it needs to add that to the array.
//Does the filters reducer need to do anything?
//Nope.
//Adding an expense doesn't affect this data at all.
//So we're not going to be adding a case for ADD_EXPENSE.

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 , createdAt: -21000}));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300 , createdAt: -1000}));

// store.dispatch(removeExpense({ id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500})); //two arguments: 1. ID, 2.updates object, on here we can determine which ones we want to update

 //store.dispatch(setTextFilter('co'));
// store.dispatch(setTextFilter(''));

 store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));


const demoState = {
    expenses: [{
        id: 'kljjkl',
        description: 'January rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createAt: 0
    }],
//tracking various filters that we want the users to be able to apply.
   filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
   } 
};

const user = {
    name: 'Jen',
    age: 24
}

// console.log({
//     age: 27,
//     ...user,
//     location:'Philadetphia'
    
// })