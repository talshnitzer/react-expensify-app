import React from "react";
//'Moment' is a time utility library. it makes it asy to work with time.
import moment from 'moment';
//'react-dates' is a calendar picker tool that require moment.
import { SingleDatePicker } from 'react-dates';


//using 'class' based component because we use component 'state'.
export default class ExpenseForm extends React.Component {
    //'placeholder'- something to show in the input when there is no text typed by the user
    //'autoFocus'- when we visit the page it automatically puts the cursor and the focus on that input
    //use local component state to track the changes to all of these inputs,
    //submit form will actually send that redx to edit the existing expense or create a new one

    //only use the defaults for these four state values.
    //If no expense was passed down. so the AddExpense page still works,
    //But if an expense was passed down we want to start these off at those values.
    //we have to use constructor function for that

    constructor(props) {
        super(props);

        this.state={
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount/ 100).toString() : '',
            //if 'expense' exist, create an instance of moment at a specific point in time,
            //so we pass to the moment() func a timestatmp
            createdAt: props.expense ? moment(props.expense.createdAt): moment(),
            //focused means that the calendar is open
            calendarFocused: false,
            error: ''
        };
    }
    
    //the updater function in 'setState':
    //implicitly return an object, So I wrap it in parentheses,
    //set 'description = description variable', so I can use the ES6 object shorthand.
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}));
    };

    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState (() => ({note}));
    };

    onAmountChange = (e) => {
        const amount =e.target.value;
        //regular expression to enforce the 'amount' format. details on the botom.
        //'!amount' condition added in order to allow the user to delete the amount entered the the input
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }  
    };

    //in  the API- 'onDateChange' gets called with the moment. we call it 'createdAt'
    onDateChange = (createdAt) => {
        if (createdAt) { //to prevent the user from deleting the date fro the input
            this.setState(() => ({ createdAt }));
        } 
    };

    onFocusChange = ({ focused }) => {
        this.setState(() => ({calendarFocused: focused}));
    
    }

    onSubmit = (e) => {
        e.preventDefault(); //so there will not be a full page refresh, but handle this with js instead
        if (!this.state.description || !this.state.amount) {  
            this.setState(() => ({error: 'Please provide description and amount'}));
        } else {
            this.setState(() => ({error: ''}));
            this.props.onSubmit({ //here we pass the 'expense' object to EditExpense and AddExpense components where the 'dispatch' is done
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100, //base 10, convert to cents
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    };

    render() {
        return (
                <form className="form" onSubmit={this.onSubmit}>
                    {this.state.error && <p className="form__error">{this.state.error}</p>} 
                    <input 
                        type="text"
                        placeholder="Description"
                        autoFocus
                        className="text-input"
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                    type="text"
                    placeholder="Amount"
                    className="text-input"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        //customize number of months see,and that days in the past will be available.
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea 
                    placeholder="Add a note for your expense (optional)"
                    className="textarea"
                    value={this.state.text}
                    onChange={this.onNoteChange}
                    >
                    </textarea>
                    <div> 
                        <button className="big_button">Save Expense</button>
                    </div>
                </form>
        )
    }
}

//why 'button' element above has its own div? this is for styling purposes:
//the 'form' element has a display 'flex' that cause the direct elements under it to take 
//the full width of the screen. we don't want that for the 'button' element

//REGEX build explanation:
//look for a digit and we use backslash 'd' for that.
//we don't want to match a letter upfront So we force the string to start with a digit by the '^' key.
//to allow the user to add many digits - we use '{1,}' saying we want range from 1 to infinity digits.
//to add a decimal point, optional, you could have a decimal maybe you don't.
//But if I do have it I want to make sure it's actually a match.
// to create an optional group: set up parentheses and a question mark at the end.
//what we've done is we've created a new group matching it between 0 and 1 times.
//That means you don't have to have this at all or if you do have it you just have it once which is exactly
//inside the parenthesis- the escape that with a backslash and DOT character.
//to match it literally then we're looking for numbers once again.
//We want to allow for 0 to 2 digits after the dot.
//we use curly braces to define that range on the low end zero on the high end 2.
//at the end a dollar sign.
//This makes sure that the regular expression ends with what we have here as opposed to having other characters

