import React from 'react';
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';//browser router used once to create the new router and 'route' for every page.
import { createBrowserHistory } from 'history';
import AddExpensePage from '../components/AddExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute'

export const history = createBrowserHistory();//creating 'history' manually (not by react-router)

//define the router configuration for our application in jsx 
//a tree structure using all the things from 'react router' and that define
//how our application should render
//'path' - What URL to use for this route.
//'component'- when we match that URL, What should we show to the screen.
//The API for 'browser router' expects the child that we pass in between the tags to either not exist or
//to have a length of one. so we set a single 'div' under 'BrowserRouter'
//'exact' - exact match for 'path'
//'Switch' - re-act router move through the routes definitions in order and stops when it finds a match 
//':id'- is going to dynamically match whatever comes after the "/"
//behind the scenes, react-router create an instance of 'browser history' and register it with our new router

const AppRouter = ()  => ( //At this point we have a valid router set up                                               
    //<BrowserRouter> //in order to use our own 'history' module, and not the '<BrowserRouter>' builtin history, we use '<Router>' instead of '<BrowserRouter>'.
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={LoginPage} exact={true}></Route>
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} exact={true}></PrivateRoute>
                <PrivateRoute path="/create" component={AddExpensePage}></PrivateRoute>
                <PrivateRoute path="/edit/:id" component={EditExpensePage}></PrivateRoute>
                <Route path="/help" component={HelpPage}></Route>
                <Route component={NotFoundPage}></Route>
            </Switch>
        </div>
    </Router>
    //</BrowserRouter>
);

export default AppRouter;
