import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

//dybamic 'to' attribute: to inject the 'id', create the javascript expression '{}' and inside a template string 
//to format the date - momentjs.com>docs>display
//to format currency - 'numeral' lib at numeraljs.com. this lib can be customise to use local currency
const ExpenseListItem = ({ description, amount, createdAt, id}) => (
    <Link className="list-item" to={`/edit/${id}`} > 
        <div>
            <h3 className="list-item__title">{description}</h3>
            <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')} </span>
        </div>
        <h3 className="list-item__data">{numeral(amount / 100).format('$0,0.00')}</h3>
    </Link>
);

export default ExpenseListItem;