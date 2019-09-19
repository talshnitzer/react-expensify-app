import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'; //'react-router-dom' gives us a way to redirect via a component called a redirect.
import Header from '../components/Header';

export const PrivateRoute = ({ 
    isAuthenticated, //distractue the props object:
    component: Component, //'component' passed in (from call in AppRouter component) We're rendering it so we need an uppercase name for that,so rename it to uppercase C component ,this is a common pattern
    ...rest //Operator '...' to get all the stuff that we did not deep structure.
 }) => ( 
    <Route {...rest} component={(props) => ( //pass the props ('...rest' that we passed to 'Route') to the individual component
    //below - passing props that we get when using 'Route', but not getting if we define it like like 'history'
        isAuthenticated ? (
            <div>
                <Header />
                <Component  {...props}/> 
            </div>
        ) : (
            <Redirect to="/" /> //when redirect gets rendered it redirects you.
        )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);