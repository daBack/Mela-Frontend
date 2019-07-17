import React from 'react';
import './../style/login.css';
import LoginForm from './../components/LoginForm';

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login-left-wrapper split">
        <div className="login-header-wrapper">
          <h1>Welcome to Mela</h1>
        </div>
        <div className="login-form-wrapper">
          <LoginForm />
        </div>
      </div>
      <div className="login-right-wrapper split">
        <article>
          <p>Buy mela</p>
          <p>Sell mela</p>
          <p>Add cashMela</p>
          <div className='p-span'>
            <p>That is what we are all about here at MelaCorp</p>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Login;
