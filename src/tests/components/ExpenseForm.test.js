import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';



// in ExpenseForm we grab the moment at the current point in time.
//so every single time we run the test case the point in time has changed 
//this is a problem because The snapshot is never going to match the previous one. 
//the fix is to create a fake version of the moment library that is going to allow us to define what
//happens when the code actually calls moment(). a mock library. see jest docs for guidance.
//a folder named __mocks__, jest knows to look there for any mock versions of the libraries we are mocking.

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render expense form with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense= {expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});

//simulate event example
test('should render error for invalid form submition', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot(); //taking snapshot before the change
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });    //from enzyme - find by tag name, give access to the form element, in the expense form component
                                                //call 'simulate' (supllied by 'enzyme'). the first thing is the event.
                                                //It's a string.'click'/'submit'/'change' are valid.here it is submit since this form has an on submit handler.
                                                //providing the 'e' argument to 'onSubmit' handler as the second argument of 'simulate'
    //'state' allows us to fetch the state for that component.
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot(); //taking snapshot after change to make sur it renders correctly
});

test('should set the description on input change', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change',{
        target: { value }
    }); //match the 1st input of the description, via the 'at' (enzyme) method, passing the index argument
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on textearea change', () => {
    const value = 'My note';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change',{
        target: {value}
    });
    expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
    const value = '23.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change',{
        target: { value }
    }); 
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
    const value = '12.122';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change',{
        target: { value }
    }); 
    expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn(); 
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>); //render the ExpenseFOrm component with valis expense data (like editExpense would call it), and 'onSubmit' func which the component call
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenCalledWith({ //expect the onSubmit func to be called with expenses[0] data expect the 'id' property
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});


//when singleDatePicker does fire onDateChange, our component is acting correctly 
test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);        //trigger the prop from child component from singleDatePicker:
                                            //1.We have to find it using 'find' by component.
                                            //2.get one of its props and call it (onDateChange) using enzyme method 'props' that enable us to get props
                                            //3.This is going to give us back the handler we registered, and we call this with moment instance, as this is the data it expect to be called with 
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on change', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused: true});
    expect(wrapper.state('calendarFocused')).toBe(true);
});

// test('should call onSubmit prop for valid form submission', () => {
//     const onSubmitSpy = jest.fn(); //create a new spy,this is a func we call with no arguments that returns the new spy
//     onSubmitSpy('Andrew');//call the spy
//     expect(onSubmitSpy).toHaveBeenCalledWith('Andrew', 'Philadelphia');//check that the spy was called
// });
