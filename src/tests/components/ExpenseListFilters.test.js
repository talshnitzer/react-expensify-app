import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilter } from '../../components/ExpenseListFilters';
import { filters, altFilters} from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper, e;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilter
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
        />
        );
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt datacorrectly', () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    e = { 
        target: { 
            value: 'rent'
        }};
    wrapper.find('input').prop('onChange')(e);
    // wrapper.find('input').simulate('change', {
    //     target: {value}
    // });  //another option
    expect(setTextFilter).toHaveBeenLastCalledWith(e.target.value);
});

test('should sort by date', () => {
    e = { 
        target: { 
            value: 'date'
        }};
    wrapper.setProps({
            filters: altFilters
        });// to switch it over to non default, which is sort by date
    wrapper.find('select').prop('onChange')(e);
    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
    e = { 
        target: { 
            value: 'amount'
        }};
    wrapper.find('select').prop('onChange')(e);
    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate });
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () => {
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    //expect(wrapper.state('calendarFocused')).not.toBe(null);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});