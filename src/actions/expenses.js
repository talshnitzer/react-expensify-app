import uuid from 'uuid';
import database from '../firebase/firebase';

//before using firebase db the flow was:
//component calls action generator
//action generator returns object
//component dispatches object
//redux store changes

//inorder to use firebase the flow changes to:
//components calls action generator
//action generator returns function
//component dispatches function (using rudux tool - redux-thunk)
//function runs (has ability to dispatch other actions an do whatever it wants)


// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

//old version of ADD_EXPENSE (before adding firebase calls)
// export const addExpense = (
//     { 
//         description  = '', 
//         note = '', 
//         amount = 0, 
//         createdAt = 0
//     } = {}
//     ) => ({
//     type: 'ADD_EXPENSE',
//     expense: {
//         id: uuid(),
//         description,
//         note,
//         amount,
//         createdAt
//     }
// });


//this function gets called internally by redux, it gets called with dispatch.
//we write some data to firebase, waiting for that data to correctly sync,
//then we'll use dispatch to dispatch addExpense so the redux store reflects those changes as well.
export const startAddExpense = (expenseData = {}) => { //I get some expenseData as an argument, and if I don't I set it equal to an empty object.
    return (dispatch, getState) => {             //this will work because we installed the 'thunk' middleware. w/o it it will not work. this gives us access to dispatch and get state fundtions
                                        //returning a function instead of an object
        const uid = getState().auth.uid;
        const {
        description  = '', 
        note = '', 
        amount = 0, 
        createdAt = 0
        } = expenseData; //distructure from expenseData
        const expense = {description, note, amount, createdAt};

        //by returning the promise chain, we can continue chaining on over at expenses.test.js
        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

// REMOVE_EXPENSE
export const removeExpense = ({id}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = ({id} = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database
            .ref(`users/${uid}/expenses/${id}`)
            .remove()
            .then(() => {
                dispatch(removeExpense({id}));
        });
    };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({   //arguments ID and updates, neither of which need defaults if you don't
                                        //have the ID and you're not updating anything there's no need to call it.
                                        //And then we'll implicitly return an object.
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates));
        });
    };
};

//SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return(dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`) //The 'return' here, makes sure the promise actually gets returned, and thats allow us to have access to 'then' at app.js were we dispatch.
            .once('value')
            .then((snapshot) => {
                const expenses = []; 

                snapshot.forEach((childSnapshot) => {
                 expenses.push({
                     id: childSnapshot.key,
                     ...childSnapshot.val()
                 });
                });
                dispatch(setExpenses(expenses));
             });
    };
}; //'startSetExpenses' is the async action - fetch the data from db and than dispatch 'setExpenses'
