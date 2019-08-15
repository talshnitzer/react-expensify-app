import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

//dybamic 'to' attribute: to inject the 'id', create the javascript expression '{}' and inside a template string 
//to format the date - momentjs.com>docs>display
//to format currency - 'numeral' lib at numeraljs.com. this lib can be customise to use local currency
const ExpenseListItem = ({ description, amount, createdAt, id}) => (
    <div>
        <Link to={`/edit/${id}`} > 
        <h3>{description}</h3>
        </Link>
        <p>
        {numeral(amount / 100).format('$0,0.00')} 
        - 
        {moment(createdAt).format('MMMM Do, YYYY')} 
        </p>
        
    </div>
);

export default ExpenseListItem;