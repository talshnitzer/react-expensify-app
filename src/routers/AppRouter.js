import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';//browser router used once to create the new router and 'route' for every page.
import AddExpensePage from '../components/AddExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';

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
const AppRouter = ()  => ( //At this point we have a valid router set up                                               
    <BrowserRouter> 
        <div>
            <Header></Header>
            <Switch>
                <Route path="/" component={ExpenseDashboardPage} exact={true}></Route>
                <Route path="/create" component={AddExpensePage}></Route>
                <Route path="/edit/:id" component={EditExpensePage}></Route>
                <Route path="/help" component={HelpPage}></Route>
                <Route component={NotFoundPage}></Route>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
