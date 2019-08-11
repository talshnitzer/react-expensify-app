//Higher Order Component (HOC) - A component (HOC) that renders another component
//Reuse code
//Render hijacking
//Prop manipulation
//Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

//{...props} means we're taking all of the props passed into this higher order component and passing them to the child.
const withAdminWarning = (WrappedComponent) => {
    return (props) => ( //THIS is the HOC
        <div>
            {props.isAdmin && <p>This is private info please don't share!</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const requiredAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {!props.isAuthenticated ? (
                <WrappedComponent {...props}/>
            ) : (
                <p>Please Login to see the info</p>
            )}
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);  //get back from withAdminWarning is an alternative version of this component:- the higher order component.
const AuthInfo = requiredAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info="These are the details"/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="These are the details"/>, document.getElementById('app'));

//this pattern used extensively with the react-redux library.
//They are going to give us a function like this.
//We're going to be passing our components inside of them.
//And the end result is going to be a new component 
//that we're going to be using and this new component
//will have access to the redux store.