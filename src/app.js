//install -> import -> use
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses'
import {login, logout} from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css'; 
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css'; //for ExpenseForm
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';


const store = configureStore();

// store.dispatch(addExpense({description: 'Water bill', amount: 4500}));
// store.dispatch(addExpense({description: 'Gas bill', createdAt: 1000}));
// store.dispatch(addExpense({description: 'Rent', amount: 109500}));



// const state = store.getState();
// console.log(getVisibleExpenses(state.expenses, state.filters));


//define the store that we want to provide to all of our components
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => { //render the app only once in the case it was not rendered yet
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

//If we see these messages then we know we trigger the authentication related functionality
//You only have access to the 'history' object if your component is directly rendered by the Route component or if you use withRouter
//in this context we are not inside of a component registered to a route.we just want to access 'history' API.
//so we use the 'history' module that we created in AppRouter

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp(); //rendering the app only if it was not rendered yet
            if (history.location.pathname === '/') { //if user is at login page redirect him to dashboard page at login
                history.push('/dashboard');
            }
        });
    } else {
        store.dispatch(logout());
        renderApp(); //rendering the app only if it was not rendered yet
        history.push('/'); //push takes the path you're trying to go to, provide that path via a string (here - login page)
    }
});
