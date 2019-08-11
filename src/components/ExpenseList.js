import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    //in map we need to provid a key Prop. setting key equal to a unique value - expense ID.
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No Expenses</p>
            ) : (
                props.expenses.map((expense) => <ExpenseListItem key={expense.id} {...expense}/> )
            )
        }   
    </div>
);

const mapStateToProps = (state) => {
//view the filtered list in the browser
        return {
            expenses: selectExpenses(state.expenses, state.filters)
        };
    };


// const mapStateToProps = (state) => {
//     //This function lets us determine what information from the store we want our component to be able to access
//         return {
//             expenses: state.expenses,
//             filters: state.filters
//         };
//     };

//create new Higher Order Components using the connect function provided from react-redux.
//what we get back is not the higher order component.
//It's the function (kind of like the functions we created in the plyground/hoc.js) 
//we need to call that function with the component (ExpenseList)
export default connect(mapStateToProps)(ExpenseList);

//when you connect a component to the redux store it's reactive, which means
//that as the store changes, your component is going to get re rendered with the new values.
