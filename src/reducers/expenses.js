//Expense Reducer

const expensesReducerDefaultState = [];

//use a default export since there is  one thing to export is the reducer function
export default  (state = expensesReducerDefaultState, action) => {
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
            });
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
};

