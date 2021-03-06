import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

//confeting the stateless function componenet into a class, 
//so We no longer define the function 'onSubmit' inline,
// which would need to get recalculated on every render.
//the former staeless function + all comments explaining the code, is commented out below.

export class AddExpensePage extends React.Component {
    onSubmit = (expense)=> {
        this.props.startAddExpense(expense); 
        this.props.history.push('/'); //History is passed into this component because 'AddExpensePage' is registered with a 'route'
    };
    render() {
        return (
            <div>
                <div className="page_header">
                    <div className="content-container">
                    <h1 className="page_header__title">Add Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm 
                    onSubmit={this.onSubmit}
                    />
                </div>
            </div>
        )
    };
};

 //connecting the dispatch call to addExpense, from outside to the AddExensePage for testing purpose
 const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
 });

 export default connect(undefined, mapDispatchToProps)(AddExpensePage);

//  const AddExpensePage = (props) => (
//     <div>
//     <h1>Add Expense</h1>
//     <ExpenseForm 
//         onSubmit={(expense)=> {
//             //props.dispatch(addExpense(expense));//adding the data to redux store
//             props.onSubmit(expense); //the above line change done for testing porpose
//            // components rendered inside of react router  get access to special props like 'history' below.
//             props.history.push('/'); //switch over to dashboard page as if I clicked the link, not through the full page refresh
//         }}
//     />
//     </div>
//  );