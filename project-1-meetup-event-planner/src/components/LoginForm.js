import React from 'react';
import { hashHistory } from 'react-router';

import Base from '../core/firebase';

import $ from 'sprint-js';

const authHandler = function(error, user) {
  if (user) {
    console.log('logged in');
    hashHistory.push('/');
  } else {
    console.log('not logged in');
  }
};

const LoginForm = () =>
  <div className="register-form">
    <h1>Login!</h1>
    <form
      onSubmit={e => {
        e.preventDefault();

        const email = $('#form-email').val();
        const password = $('#form-password').val();

        Base.authWithPassword({
          email,
          password
        }, authHandler);
      }}>
      <div className="form">
        <label htmlFor="form-email">Email: </label>
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
  </div>;

export default LoginForm;
