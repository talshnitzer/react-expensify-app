import { 
    setStartDate, 
    setEndDate, 
    setTextFilter, 
    sortByDate, 
    sortByAmount 
} from "../../actions/filters";
import moment from 'moment';

test('should generate set start date action object', () => {
    const action = setStartDate(moment(0)); // test as real life app provide 'moment' instance
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0) //check we get 'moment' instance
    })
});

test('should generate set end date action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

test('should setup the set text filter action object with default value- an empty string', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });  
});

test('should generate set text filter action object', () => {
    const text = 'Rent';
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    });
});

test ('should generate sort by date action object', () => {
    // const action = sortByDate();
    // expect(action).toEqual({
    //     type: 'SORT_BY_DATE'
    // });
    expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE'});
});

test('should generate sort by amount action object', () => {
    // const action = sortByAmount();
    // expect(action).toEqual({
    //     type: 'SORT_BY_AMOUNT'
    // });
    expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT'});
});
