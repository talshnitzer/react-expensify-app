import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker} from 'react-dates';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from '../actions/filters';



//when we set up our form inputs (text inputs, select drop downs) and we use
//'value' and 'onchange' we're creating what's known as a #controlled input#.
//this term means - an input where the value is controlled by Javascript.

export class ExpenseListFilter extends React.Component {
    state = {
        calendarFocused: null  // it is null, or it is a string.
                                //it's a string if we're focused on the first of the two calendars or the second.
                                //we don't need to do anything with this.
                                //We just need to keep track of it and pass it down in to the react dates component.
    };

    // this function get called by the react-dates library.
    //called with an object, and on that object there's a start date and an end date.
    //here we destructure the object
    onDatesChange = ({startDate, endDate}) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };

    onFocusChange =  (calendarFocused) => {
        this.setState(() => ({ calendarFocused }))
    };

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value);
    };

    onSortChange = (e) => {
        if (e.target.value === 'date') {
        this.props.sortByDate();
        } else if (e.target.value === 'amount') {
        this.props.sortByAmount();
        }
    };

    render () {
        return (
            //we have access to 'dispatch' from our connected components,so we can call directly to dispatch actions
            <div className="content-container">
                <div className="input_group">
                    <div className="input_group__item">
                        <input 
                            type="text" 
                            className="text-input"
                            placeholder="Search expenses"
                            value={this.props.filters.text} 
                            onChange={this.onTextChange}
                            />
                    </div>
                    <div className="input_group__item">
                        <select //drop down for sorting
                            className="select"
                            value={this.props.filters.sortBy}  
                            onChange={this.onSortChange}
                            >
                            <option value="date">Date</option>
                            <option value="amount">Amount</option>
                        </select>
                    </div>
                    <div className="input_group__item">
                        <DateRangePicker
                            startDate={this.props.filters.startDate}
                            endDate={this.props.filters.endDate}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            showClearDates={true}
                            numberOfMonths={1}
                            isOutsideRange={() => false}
                        ></DateRangePicker>
                    </div>
                </div>  
            </div>
        )
    }
}



const mapStateToProps = (state) =>  ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps,mapDispatchToProps)(ExpenseListFilter);