import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

//2nd div here is for styling -get a box around the login button and centering that in the screen 
export const LoginPage = ({ startLogin }) => (  //de-structure the 'props' object
    <div className="box-layout">
        <div className="box-layout__box">
        <h1 className="box-layout__title">Expensify</h1>
        <p>It's time to get expenses under control</p>
        <button className="big_button" onClick={startLogin}>Login with Google</button>
        </div>   
    </div>
);

const mapDispatchToProps  = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined,mapDispatchToProps)(LoginPage);