import expensesReducer from '../../reducers/expenses';
//A fixture is just your baseline test data 
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined,{ type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses,action);
    expect(state).toEqual([expenses[0],expenses[2]]);
});

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses,action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            id: '4',
            description: 'My expense',
            note: '',
            amount: 0,
            createdAt: 1000
        }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, action.expense]);
});

test('should edit an expense', () => {
    const description = 'Tal expense'
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: {
            description
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state[0].description).toBe(description);
});

test('should not edit an expense if expense not found', () => {
    const description = 'Tal expense'
    const action = {
        type: 'EDIT_EXPENSE',
        id: '4',
        updates: {
            description
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should set expenses', () => {
    const newExpenses =  [{
        id: 'new_1',
        description: 'new 1',
        note: 'test1',
        amount: 1000,
        createdAt: 0
    },
    {
        id: 'new_2',
        description: 'new 2',
        note: 'test2',
        amount: 2000,
        createdAt: 0
    }];
    const action = {
        type: 'SET_EXPENSES',
        expenses: newExpenses
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(newExpenses);
});