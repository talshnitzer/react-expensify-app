import uuid from 'uuid';

// ADD_EXPENSE
export const addExpense = (
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
export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});
// EDIT_EXPENSE
export const editExpense = (id, updates) => ({   //arguments ID and updates, neither of which need defaults if you don't
                                        //have the ID and you're not updating anything there's no need to call it.
                                        //And then we'll implicitly return an object.
    type: 'EDIT_EXPENSE',
    id,
    updates
});
