import React from 'react';
import Login from '../components/Login/Login';

const LoginAfterRegistered = props => {
  return (
    <div className='id-main-stage'>
        <div className='id-sub-stage'>
          <div id='login-container'>
            <h1>Login</h1>
            <Login setRole={props.setRole}/>
          </div>
        </div>
    </div>  
  );
}

export default LoginAfterRegistered;