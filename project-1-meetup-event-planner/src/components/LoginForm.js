import React from 'react';
import { browserHistory } from 'react-router';

import Base from '../core/firebase';
import $ from 'sprint-js';

function authHandler(error, user) {
  if (user) {
    console.log('logged in');
    browserHistory.push('/');
  } else {
    console.log('not logged in');
  }
}

const LoginForm = () =>
  <div className="register-form">
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
      <div className="mdl-textfield mdl-js-textfield">
        <input
          className="mdl-textfield__input"
          id="form-email"
          type="email"
          placeholder="max@mustermann.at"
          autoComplete="email"
          required
        />
        <label className="mdl-textfield__label" htmlFor="form-email">Email</label>
      </div>
      <div className="mdl-textfield mdl-js-textfield">
        <input
          className="mdl-textfield__input"
          id="form-password"
          type="password"
          autoComplete="current-password"
          placeholder="******"
          required
        />
        <label className="mdl-textfield__label" htmlFor="form-password">Password</label>
      </div>
      <button
        type="submit"
        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent submit-button">
      Login</button>
    </form>
  </div>;

export default LoginForm;
