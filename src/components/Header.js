import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
 
//'active class Name' only get applied to the link when we're on that page.
//So that's going to allow us to target the currently active link

//use link almost everywhere except for navigation where we want to take the advantage
//of being able to call out specific links.
//i.e. NavLink can make links bold when we are on those pages creating a better user experience.

export const Header = ({ startLogout }) => ( //export for testing purposes
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard" >
                <h1>Expensify</h1>
                </Link>
                {/*<NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>*/}
                <button className="big_button button--link" onClick={startLogout}>Logout</button>
            </div>
        </div>
    </header>
 );

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

 export default connect(undefined, mapDispatchToProps)(Header);
