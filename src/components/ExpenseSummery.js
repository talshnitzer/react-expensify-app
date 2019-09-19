import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/selectExpensesTotal';
import numeral from 'numeral';

//Tal's solution
// export const ExpenseSummery = (props) => (
//     <div>
//         <p>Viewing {props.expenses.length} expenses totalling {numeral(selectExpensesTotal(props.expenses) / 100).format('$0,0.00')}</p>
//     </div>
// );

//Andrew's solution
export const ExpenseSummery = ({expenseCount, ExpensesTotal}) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpenseTotal = numeral(ExpensesTotal / 100).format('$0,0.00');

    return (
        <div className="page_header">
            <div className="content-container">
                <h1 className="page_header__title">Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{formattedExpenseTotal}</span></h1>
                <div className="page-header__actions">
                    <Link className="big_button" to="/create">Add Expense</Link>
                </div>
            </div> 
        </div>
    );
};

//Tal's sollution
// const mapStateToProps = (state) => {
//     return{
//         expenses: selectExpenses(state.expenses, state.filters)
//     };
// };

//Andrew's solution
const mapStateToProps = (state) => {
    const visibleExpenses =selectExpenses(state.expenses, state.filters);
    return{
        expenseCount: visibleExpenses.length,
        ExpensesTotal: selectExpensesTotal(visibleExpenses)
    };
};

export default connect (mapStateToProps)(ExpenseSummery);