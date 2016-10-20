import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Base from '../core/firebase';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      }
    };

    this.handleSetPassword = this.handleSetPassword.bind(this);
    this.handleSetEmail = this.handleSetEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.setValidationMessage = this.setValidationMessage.bind(this);
  }

  handleSetPassword(e) {
    if (e.target.checkValidity()) {
      this.setState({
        password: e.target.value,
        errors: Object.assign({}, this.state.errors, { password: ''})
      });
    }
  }

  handleSetEmail(e) {
    if (e.target.checkValidity()) {
      this.setState({
        email: e.target.value,
        errors: Object.assign({}, this.state.errors, { email: ''})
      });
    }
  }

  authHandler(error, user) {
    if (user) {
      setTimeout(() => {
        browserHistory.push('/');
      }, 100);
    }

    if (error) {
      if (error.code === 'auth/wrong-password') {
        this.setState({errors: {password: error.message}});
      } else {
        this.setState({errors: {email: error.message}});
      }
    }
  }

  setValidationMessage(e) {
    e.preventDefault();

    const target = e.target;
    const errors = Object.assign({}, this.state.errors);
    const message = target.validationMessage;

    switch (e.target.id) {
      case 'login-email': errors.email = message; break;
      case 'login-password': errors.password = message; break;
      default: console.warn('setValidationMessage: unknown input name');
    }

    this.setState({ errors: errors });
  }

  onSubmit(e) {
    e.preventDefault();

    Base.authWithPassword({
      email: this.state.email,
      password: this.state.password
    }, this.authHandler);
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.onSubmit}>
          <TextField
            floatingLabelText="Email"
            type="email"
            id="login-email"
            onChange={this.handleSetEmail}
            onInvalid={this.setValidationMessage}
            errorText={this.state.errors.email}
            fullWidth={true}
            autoComplete="email"
            required
          />
          <TextField
            floatingLabelText="Password"
            type="password"
            id="login-password"
            onChange={this.handleSetPassword}
            onInvalid={this.setValidationMessage}
            errorText={this.state.errors.password}
            fullWidth={true}
            autoComplete="current-password"
            required
          />
          <RaisedButton type="submit" fullWidth={true} label="Login" primary={true} />
        </form>
      </div>
    );
  }
}

export default LoginForm;
