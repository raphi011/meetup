import React from 'react';

const $ = require('sprint-js');

const Login = login =>
  <section id="register-form-container">
    <div className="register-form">
      <h1>Login!</h1>
      <form
        onSubmit={e => {
          e.preventDefault();

          const email = $('#form-email').val();
          const password = $('#form-password').val();

          login(email, password);
        }}>
        <div className="form">
          <label htmlFor="form-eqail">Email: </label>
          <input
            id="form-email"
            type="email"
            placeholder="max@mustermann.at"
            autoComplete="email"
            required
          />
        </div>
        <div className="form">
          <label htmlFor="form-password">Password: </label>
          <input
            id="form-password"
            type="password"
            autoComplete="current-password"
            placeholder="******"
            required
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  </section>;

export default Login;
