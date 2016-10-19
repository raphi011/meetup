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
      error: ''
    };

    this.handleSetPassword = this.handleSetPassword.bind(this);
    this.handleSetEmail = this.handleSetEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.authHandler = this.authHandler.bind(this);
  }

  handleSetPassword(e) {
    this.setState({password: e.target.value});
  }

  handleSetEmail(e) {
    this.setState({email: e.target.value});
  }

  authHandler(error, user) {
    if (user) {
      setTimeout(() => {
        browserHistory.push('/');
      }, 100);
    }

    if (error) {
      this.setState({error: error.message});
    }
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
            onChange={this.handleSetEmail}
            value={this.state.email}
            fullWidth={true}
            autoComplete="email"
            autoFocus
            required
          />
          <TextField
            floatingLabelText="Password"
            type="password"
            onChange={this.handleSetPassword}
            value={this.state.password}
            errorText={this.state.error}
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
