import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let wrapper, editExpense, startRemoveExpense, history;

beforeEach(() => {
    history = {push: jest.fn()};
    editExpense = jest.fn();
    startRemoveExpense = jest.fn();
    wrapper = shallow(
        <EditExpensePage 
        expense={expenses[0]} 
        editExpense={editExpense} 
        startRemoveExpense={startRemoveExpense} 
        history={history}
        />);
});

test('should render EditExpense correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[1]);//Andrews solution
    //expect(editExpense).toHaveBeenLastCalledWith(expenses[1]); //Tal's solution
});

test('should handle removeExpense', () => {
    //wrapper.find('button').prop('onClick')();//Tal's vertion (pass)
    wrapper.find('button').simulate('click'); //Andrew's version
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({  //Andrew's version
        id: expenses[0].id
    });
    //expect(removeExpense).toHaveBeenCalled();//Tal's vertion (pass)
});