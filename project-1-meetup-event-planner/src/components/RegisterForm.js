import React, {Component} from 'react';

const $ = require('sprint-js');

class RegisterForm extends Component {

  static handleChange(e) {
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
  }

  static handleSubmit(e) {
    e.preventDefault();

    const email = $('#form-email').val();
    const password = $('#form-password').val();

    this.props.register(email, password);
  }

  render() {
    return (
      <div className="register-form">
        <h1>Signup!</h1>
        <form onSubmit={RegisterForm.handleSubmit}>
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
              onChange={RegisterForm.handleChange}
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
      </div>
    );
  }
}

RegisterForm.propTypes = {
  register: React.PropTypes.function
};

export default RegisterForm;
