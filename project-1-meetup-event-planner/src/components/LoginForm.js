import React from 'react';
import {browserHistory} from 'react-router';
import {Textfield, Button} from 'react-mdl';

import Base from '../core/firebase';
import $ from 'sprint-js';

function authHandler(error, user) {
  if (user) {
    // wait for firebase to reflect logged in state
    setTimeout(() => {
      browserHistory.push('/');
    }, 100);
  }
}

function onSubmit(e) {
  e.preventDefault();

  const email = $('#form-email').val();
  const password = $('#form-password').val();

  Base.authWithPassword({
    email,
    password
  }, authHandler);
}

const LoginForm = () =>
  <div>
    <form
      onSubmit={e => onSubmit(e)}>
      <Textfield
        label="Email"
        id="form-email"
        type="email"
        autoComplete="email"
        autoFocus
        floatingLabel
        required
      />
      <Textfield
        label="Password"
        id="form-password"
        type="password"
        autoComplete="current-password"
        floatingLabel
        required
      />
      <Button type="submit" className="submit-button" raised colored ripple>Login</Button>
    </form>
  </div>;

export default LoginForm;
