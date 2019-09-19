import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense,  startRemoveExpense} from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => { //the expense we get from the form
        //this.props.editExpense(expense); //Tal version of solution to testing
        this.props.startEditExpense(this.props.expense.id, expense); //Andrew's version of solution to testing
        this.props.history.push('/'); //get back to dashboard
    };
    onClick = () => {
        //this.props.removeExpense(); //Tal version of solution to testing
        this.props.startRemoveExpense({id: this.props.expense.id}); //Andrew's version of solution to testing
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <div className="page_header">
                    <div className="content-container">
                    <h1 className="page_header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm   
                    expense={this.props.expense} //the existing expense
                    onSubmit={this.onSubmit}
                    ></ExpenseForm>
                    <button className="big_button button--secondary" onClick = {this.onClick}>Remove Expense</button>
                </div>
            </div>
        )
    };
};

const mapStateToProps = (state, props) => ({
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});


//Andrew's version of solution to testing
const mapDispatchToProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});


//Tal's version of solution to testing
// const mapDispatchToProps = (dispatch,props) => {
//     return {
//         editExpense: (expense) => dispatch(editExpense(props.match.params.id,{...expense})),
//         removeExpense: () => dispatch(removeExpense({id: props.match.params.id}))
//     };
// };

 export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);

 //We're searching the expenses array for an expense whose I.D. matches Prop.match.params.ID.
// how do we access it?
//we have access to the prop's at The second argumen of mapStateToProps
//we can take some of the current props that were passed into the high order component and we can use
//them to calculate the props that we want to add on.
// so react-router renders our higher order component,
//the higher order component passes the props through,
// and it also allows us to add on some new ones

