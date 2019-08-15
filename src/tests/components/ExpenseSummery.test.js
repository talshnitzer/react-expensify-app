import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummery } from '../../components/ExpenseSummery';
import expenses from '../fixtures/expenses';

//Tal's solution
// test('should render ExpenseSummery correctly with 1 expense' , () => {
//     const wrapper = shallow(<ExpenseSummery expense={[expenses[0]]}/>);
//     expect(wrapper).toMatchSnapshot();
// });

//Andrew's solution
test('should render ExpenseSummery correctly with 1 expense' , () => {
    const wrapper = shallow(<ExpenseSummery expenseCount={1} ExpensesTotal={235}/>);
    expect(wrapper).toMatchSnapshot();
});

//Tal's version
// test('should render ExpenseSummery correctly with 2 expenses' , () => {
//     const wrapper = shallow(<ExpenseSummery expenses={[expenses[0], expenses[1]]}/>);
//     expect(wrapper).toMatchSnapshot();
// });

//Andrew's solution
test('should render ExpenseSummery correctly with multiple expenses' , () => {
    const wrapper = shallow(<ExpenseSummery expenseCount={23} ExpensesTotal={23512346890}/>);
    expect(wrapper).toMatchSnapshot();
});

