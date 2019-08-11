import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT'}); //@@INIT action object is a single property type:@@INIT.
                                                                //this is used internally by redux.
                                                                //We're never going to actually respond to this inside of our reducers or dispatch it on our own but
                                                                //this is what we dispatch to test the reducer set correctly with the defaults.
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });      
});

test('should set sort by to amount', () => {
    const state = filtersReducer(undefined, { type:'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('should set sort by to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = {type: 'SORT_BY_DATE'};
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const text = 'This is my filter';
    const action = {
        type: 'SET_TEXT_FILTER',
        text
    };
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe(text);
});

test('should set start date filter', () => {
    const action = {
        type: 'SET_START_DATE',
        startDate: moment()
    };
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(action.startDate);
});

test('should set end date filter', () => {
    const action = {
        type: 'SET_END_DATE',
        endDate: moment()
    };
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(action.endDate);
});