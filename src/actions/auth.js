import { firebase,googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
    type:   'LOGIN',
    uid
});

export const startLogin = () => {
    return () => {
        return  firebase.auth().signInWithPopup(googleAuthProvider);    //'return' just to return the promise chain, allowing others to attach onto it
    }; //sign in to one of my accounts, using the pop up system, where we pick the account or log in, then you're authenticated. log in with my Google related services
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return () => { //return a function - redux 'thunk' spec
        return firebase.auth().signOut();// sign a user out of the application. no arguments needed.
    };
};