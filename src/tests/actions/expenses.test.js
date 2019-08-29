import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

//We're creating the configuration, so we can allow the test cases to all create the same mock store.
//calling configureMockStore and this is where we can optionally pass in
//an array of middleware that we want to use.
//we did set up one piece of middleware. We have to provide it.

const createMockStore = configureMockStore([thunk]);

test ('should setup remove expense action object' ,() => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({           //'object === another object' always get false.
                                    //same thing with an array.
                                    //instead check the properties on those objects and see if they're all equal.
                                    //the expect assertion library support this with the toEqual method
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should  setup edit expense action object', () => {
    const action = editExpense('abc123',{note: 'New note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'abc123',
        updates: {
            note: 'New note value'
        }
    })
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
        // expense: {      //we can't leave off id because the test will fail, but the id is random
        //     ...expenseData,
        //     id: expect.any(String)
        // }
    });
});

//create a fake redux store for testing purposes.
//And this is going to allow us to make the correct assertions
//for this we use the lib reduc-mock store
//at Async tests like this one - if we want to force 'jest' to wait until a specific point in time,
// we have to provide an argument called 'done'.
//And this test case will no longer be considered a success or a failure until after we call done.

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'mouse',
        amount: 300,
        note: 'This one is better',
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');  
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done(); //'jest' waits until this moment in time
    }); // Promise chaining - the ability to chain calls on promises
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const defaultData = {
        description: '', 
        note: '', 
        amount: 0, 
        createdAt: 0
    };
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');  
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultData);
        done(); 
    });
});

// test('should setup the add expense action object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             description: '', 
//             note: '', 
//             amount: 0, 
//             createdAt: 0,
//             id: expect.any(String)
//         }    
//     });
// });