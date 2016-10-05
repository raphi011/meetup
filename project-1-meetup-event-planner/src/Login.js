import React, { Component } from 'react';
import { hashHistory } from 'react-router'

var $ = require("sprint-js");

class Login extends Component {
  handleSubmit(e) {
    e.preventDefault();

    var email = $("#form-email").val();
    var password = $("#form-password").val();

    console.log('email: ' + email + ' password: ' + password);

    firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(function() {
              hashHistory.push('/');
            })
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
            });
  }

  render() {
    return (
      <section id="register-form-container">
        <div className="register-form">
          <h1>Login!</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form">
              <label htmlFor="form-email">Email: </label>
              <input id="form-email" type="email" placeholder="max@mustermann.at" autoComplete="email" required/>
            </div>
            <div className="form">
              <label htmlFor="form-password">Password: </label>
              <input id="form-password" type="password" autoComplete="current-password" placeholder="******" required/>
            </div>
            <input type="submit" value="Login" />
          </form>
        </div>
    </section>
    );
  }
}

export default Login;
