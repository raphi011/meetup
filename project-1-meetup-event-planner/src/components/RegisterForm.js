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
      birthday: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSetName = this.handleSetName.bind(this);
    this.handleSetEmail = this.handleSetEmail.bind(this);
    this.handleSetPassword = this.handleSetPassword.bind(this);
    this.authHandler = this.authHandler.bind(this);
  }

  handleSetEmail(e) {
    this.setState({email: e.target.value});
  }

  handleSetName(e) {
    this.setState({name: e.target.value});
  }

  handleSetPassword(e) {
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

    this.setState({ password: password });
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
            autoComplete="name"
            onChange={this.handleSetName}
            value={this.state.name}
            required
          />
          <TextField
            floatingLabelText="Email"
            fullWidth={true}
            onChange={this.handleSetEmail}
            value={this.state.email}
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            floatingLabelText="Password"
            fullWidth={true}
            onChange={this.handleSetPassword}
            value={this.state.password}
            type="password"
            autoComplete="new-password"
            required
          />
          <DatePicker
            floatingLabelText="Birthday"
            fullWidth={true}
            autoComplete="bday"
          />
          <RaisedButton type="submit" primary={true} label="Go" fullWidth={true} />
        </form>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  register: React.PropTypes.func
};

export default RegisterForm;
