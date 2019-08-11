import React from 'react';
import {NavLink} from 'react-router-dom';

//'active class Name' only get applied to the link when we're on that page.
//So that's going to allow us to target the currently active link

//use link almost everywhere except for navigation where we want to take the advantage
//of being able to call out specific links.
//i.e. NavLink can make links bold when we are on those pages creating a better user experience.

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
        <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
    
    </header>
 );

 export default Header;
