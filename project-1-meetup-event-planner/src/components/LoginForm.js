import React from 'react';
import {browserHistory} from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Base from '../core/firebase';
import $ from 'sprint-js';

function authHandler(error, user) {
  if (user) {
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
      <TextField
        floatingLabelText="Email"
        id="form-email"
        type="email"
        fullWidth={true}
        autoComplete="email"
        autoFocus
        required
      />
      <TextField
        floatingLabelText="Password"
        id="form-password"
        type="password"
        fullWidth={true}
        autoComplete="current-password"
        required
      />
      <RaisedButton type="submit" fullWidth={true} label="Login" primary={true} />
    </form>
  </div>;

export default LoginForm;
