import React from 'react';
import {Textfield, Button} from 'react-mdl';
import { browserHistory } from 'react-router';
import Base from '../core/firebase';

const $ = require('sprint-js');

const handleChange = e => {
  const passwordInput = e.target;
  const password = passwordInput.value;

  if (!password.match(/[!@#$%^&\*\(\)_+]/g)) {
    passwordInput.setCustomValidity(
      'Add atleast one of the following symbols: !@#$%^&*()_+');
  } else if (password.length < 8) {
    passwordInput.setCustomValidity(
      'Password has to be longer than 8 characters');
  } else {
    passwordInput.setCustomValidity('');
  }
};

function handleSubmit(e) {
  e.preventDefault();

  const email = $('#form-email').val();
  const password = $('#form-password').val();

  Base.createUser({
    email,
    password
  }, authHandler);
}

function authHandler(error, user) {
  if (user) {
    const name = $('#form-name').val();
    user.updateProfile({
      displayName: name
    }, function() {
      browserHistory.push('/');
    });
  }
}

const RegisterForm = () =>
  <div>
    <form onSubmit={e => handleSubmit(e)}>
      <Textfield
        label="Name"
        id="form-name"
        type="text"
        autoComplete="name"
        autoFocus
        floatingLabel
        required
      />
      <Textfield
        label="Email"
        id="form-email"
        type="email"
        autoComplete="email"
        floatingLabel
        required
      />
      <Textfield
        label="Password"
        id="form-password"
        type="password"
        autoComplete="new-password"
        floatingLabel
        required
      />
      <Textfield
        label="Birthday"
        id="form-birthday"
        autoComplete="bday"
        floatingLabel
      />
      <Button type="submit" className="submit-button" raised colored ripple>Go</Button>
    </form>
  </div>;

RegisterForm.propTypes = {
  register: React.PropTypes.func
};

export default RegisterForm;
