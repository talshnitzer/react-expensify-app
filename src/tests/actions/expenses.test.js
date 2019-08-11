import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

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
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'this was last month rent'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {      //we can't leave off id because the test will fail, but the id is random
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('should setup the add expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '', 
            note: '', 
            amount: 0, 
            createdAt: 0,
            id: expect.any(String)
        }    
    });
});