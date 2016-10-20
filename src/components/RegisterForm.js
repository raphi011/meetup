import React, {Component} from 'react';
import { browserHistory } from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

import Base from '../core/firebase';

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      birthday: null,
      errors: {
        name: '',
        email: '',
        password: ''
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSetName = this.handleSetName.bind(this);
    this.handleSetEmail = this.handleSetEmail.bind(this);
    this.handleSetPassword = this.handleSetPassword.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.setValidationMessage = this.setValidationMessage.bind(this);
  }

  handleSetEmail(e) {
    if (e.target.checkValidity()) {
      this.setState({
        email: e.target.value,
        errors: Object.assign({}, { email: ''})
      });
    }
  }

  handleSetName(e) {
    if (e.target.checkValidity()) {
      this.setState({
        name: e.target.value,
        errors: Object.assign({}, { name: ''})
      });
    }
  }

  handleSetPassword(e) {
    const target = e.target;
    const password = target.value;
    let errorMessage = '';

    if (!password.match(/[!@#$%^&\*\(\)_+]/g)) {
      errorMessage = 'Add atleast one of the following symbols: !@#$%^&*()_+';
    } else if (password.length < 8) {
      errorMessage = 'Password has to be longer than 8 characters';
    }

    target.setCustomValidity(errorMessage);

    if (e.target.checkValidity()) {
      this.setState({
        password,
        errors: Object.assign({}, { password: ''})
      });
    }
  }

  setValidationMessage(e) {
    e.preventDefault();

    const target = e.target;
    const errors = Object.assign({}, this.state.errors);
    const message = target.validationMessage;

    switch (e.target.id) {
      case 'register-email': errors.email = message; break;
      case 'register-password': errors.password = message; break;
      case 'register-name': errors.name = message; break;
      default: console.warn('setValidationMessage: unknown input name');
    }

    this.setState({ errors: errors });
  }

  handleSubmit(e) {
    e.preventDefault();

    Base.createUser({
      email: this.state.email,
      password: this.state.password
    }, this.authHandler);
  }

  authHandler(error, user) {
    if (user) {
      user.updateProfile({
        displayName: this.state.name
      }).then(function() {
        setTimeout(() => {
          browserHistory.push('/');
        }, 100);
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            floatingLabelText="Name"
            fullWidth={true}
            type="text"
            id="register-name"
            autoComplete="name"
            onChange={this.handleSetName}
            onInvalid={this.setValidationMessage}
            errorText={this.state.errors.name}
            className="autofocus"
            required
          />
          <TextField
            floatingLabelText="Email"
            fullWidth={true}
            onChange={this.handleSetEmail}
            onInvalid={this.setValidationMessage}
            errorText={this.state.errors.email}
            type="email"
            id="register-email"
            autoComplete="email"
            required
          />
          <TextField
            floatingLabelText="Password"
            fullWidth={true}
            onChange={this.handleSetPassword}
            onInvalid={this.setValidationMessage}
            errorText={this.state.errors.password}
            type="password"
            id="register-password"
            autoComplete="new-password"
            required
          />
          <DatePicker
            floatingLabelText="Birthday"
            fullWidth={true}
            autoComplete="bday"
          />
          <RaisedButton
            type="submit"
            primary={true}
            label="Go"
            fullWidth={true}
          />
        </form>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  register: React.PropTypes.func
};

export default RegisterForm;
