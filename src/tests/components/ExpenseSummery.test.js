import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummery } from '../../components/ExpenseSummery';
import expenses from '../fixtures/expenses';

test('should render ExpenseSummery correctly with 1 expense' , () => {
    const wrapper = shallow(<ExpenseSummery expenses={[expenses[0]]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummery correctly with 2 expenses' , () => {
    const wrapper = shallow(<ExpenseSummery expenses={[expenses[0], expenses[1]]}/>);
    expect(wrapper).toMatchSnapshot();
});

