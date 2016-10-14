import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import * as firebase from 'firebase';

const $ = require('sprint-js');

class Register extends Component {

  static handleChange(e) {
    const passwordInput = e.target;
    const password = passwordInput.value;

    if (password.length < 8) {
      passwordInput.setCustomValidity(
        'Password has to be longer than 8 characters');
    } else if (!password.match(/[!@#$%^&\*\(\)_+]/g)) {
      passwordInput.setCustomValidity(
        'Add atleast one of the following symbols: !@#$%^&*()_+');
    } else {
      passwordInput.setCustomValidity('');
    }
  }

  static handleSubmit(e) {
    e.preventDefault();

    const email = $('#form-email').val();
    const password = $('#form-password').val();

    console.log('email: ' + email + ' password: ' + password);

    firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function() {
              hashHistory.push('/');
            })
            .catch(function(error) {
              // avar errorCode = error.code;
              // var errorMessage = error.message;
            });
  }

  render() {
    return (
      <section id="register-form-container">
        <div className="register-form">
          <h1>Signup!</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form">
              <label htmlFor="form-name">Name: </label>
              <input id="form-name" type="text" placeholder="Max Mustermann" autoComplete="name" autoFocus required/>
            </div>
            <div className="form">
              <label htmlFor="form-email">Email: </label>
              <input id="form-email" type="email" placeholder="max@mustermann.at" autoComplete="email" required/>
            </div>
            <div className="form">
              <label htmlFor="form-password">Password: </label>
              <input id="form-password" onChange={this.handleChange} type="password" autoComplete="new-password" placeholder="******" required/>
            </div>
            <div className="form">
              <label htmlFor="form-name">Birthday: </label>
              <input id="form-name" type="date" data-date-format="dd.mm.yyyy" autoComplete="bday" />
            </div>
            <input type="submit" value="Go" />
          </form>
        </div>
    </section>
    );
  }
}

export default Register;
