import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  return (
    <section id="login-form-container">
      <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
        <div className="mdl-tabs__tab-bar">
          <a href="#login-panel" className="mdl-tabs__tab is-active">Login</a>
          <a href="#register-panel" className="mdl-tabs__tab">Register</a>
        </div>
        <div className="mdl-tabs__panel is-active" id="login-panel">
          <LoginForm />
        </div>
        <div className="mdl-tabs__panel" id="register-panel">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
};

export default Login;
