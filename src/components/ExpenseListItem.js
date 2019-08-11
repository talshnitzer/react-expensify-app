import React from 'react';
import {Link} from 'react-router-dom';

//dybamic 'to' attribute: to inject the 'id', create the javascript expression '{}' and inside a template string 
const ExpenseListItem = ({ description, amount, createdAt, id}) => (
    <div>
        <Link to={`/edit/${id}`} > 
        <h3>{description}</h3>
        </Link>
        <p>{amount} - {createdAt}</p>
        
    </div>
);

export default ExpenseListItem;