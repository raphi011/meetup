import React from 'react';

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

const handleSubmit = (e, register) => {
  e.preventDefault();

  const email = $('#form-email').val();
  const password = $('#form-password').val();

  register(email, password);
};

const RegisterForm = ({ register }) =>
  <div className="register-form">
    <h1>Signup!</h1>
    <form onSubmit={e => handleSubmit(e, register)}>
      <div className="form">
        <label htmlFor="form-name">Name: </label>
        <input
          id="form-name"
          type="text"
          placeholder="Max Mustermann"
          autoComplete="name"
          autoFocus
          required
        />
      </div>
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
          onChange={handleChange}
          type="password"
          autoComplete="new-password"
          placeholder="******"
          required
        />
      </div>
      <div className="form">
        <label htmlFor="form-name">Birthday: </label>
        <input
          id="form-name"
          type="date"
          data-date-format="dd.mm.yyyy"
          autoComplete="bday"
        />
      </div>
      <input type="submit" value="Go" />
    </form>
  </div>;

RegisterForm.propTypes = {
  register: React.PropTypes.func
};

export default RegisterForm;
