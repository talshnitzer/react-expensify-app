import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
 
//'active class Name' only get applied to the link when we're on that page.
//So that's going to allow us to target the currently active link

//use link almost everywhere except for navigation where we want to take the advantage
//of being able to call out specific links.
//i.e. NavLink can make links bold when we are on those pages creating a better user experience.

export const Header = ({ startLogout }) => ( //export for testing purposes
    <header>
        <h1>Expensify</h1>
        <NavLink to="/dashboard" activeClassName="is-active" >Dashboard</NavLink>
        <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
        <button onClick={startLogout}>Logout</button>
    </header>
 );

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

 export default connect(undefined, mapDispatchToProps)(Header);
