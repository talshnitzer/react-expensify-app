import moment from 'moment';

//Get visible expenses
export default  (expenses, {text, sortBy, startDate, endDate}) => { //destructurin the filters object
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt)
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') :  true ;  //is it the same day or before?
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment,'day') : true;
        const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1; //1=> b comes first, -1=>a comes first
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1 ;
        }
    });
};