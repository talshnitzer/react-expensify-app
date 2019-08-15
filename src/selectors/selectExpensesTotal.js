
export default  (expenses) => {
    //Tal solution
    // const expensesAmounts = expenses.map(expense => expense.amount);
    // const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // return (expenses.length > 0) ? expensesAmounts.reduce(reducer) : 0 ;

    //Andrew's solution
    return expenses
            .map((expense) => expense.amount)
            .reduce((sum, value) => sum + value, 0);
};