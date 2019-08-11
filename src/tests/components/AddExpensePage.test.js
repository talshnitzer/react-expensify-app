import React from 'react';
import { shallow } from "enzyme";
import { AddExpensePage } from "../../components/AddExpensePage";
import expenses from '../fixtures/expenses';

let addExpense, history, wrapper;

beforeEach(() => {
    addExpense = jest.fn();     //expense page expect 2 props:onSubmit, history
    history = {push: jest.fn()};   //pass props in by using spies
    wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
});

test('should render AddExpensePage correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    //call 'onSubmit' function that gets passed into expense form.
    //1. use wrapper to find ExpenseForm 
    //2. access the prop we're interested in, using Prop. The one we are looking for is 'onSubmit'
    //3. call it with the data that it would be called with in the real world an expense object. 
    //I'll grab the second one with the index of one.
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});