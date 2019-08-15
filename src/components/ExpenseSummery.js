import React from 'react';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/selectExpensesTotal';
import numeral from 'numeral';

export const ExpenseSummery = (props) => (
    <div>
        <p>Viewing {props.expenses.length} expenses totalling {numeral(selectExpensesTotal(props.expenses) / 100).format('$0,0.00')}</p>
    </div>
);

const mapStateToProps = (state) => {
    return{
        expenses: selectExpenses(state.expenses, state.filters)
    };
};

export default connect (mapStateToProps)(ExpenseSummery);