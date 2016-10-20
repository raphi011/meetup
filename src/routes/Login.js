import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

class Login extends Component {
  constructor(props) {
    super(props);

    this.tabIndex = 0;
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.select();
  }

  select() {
    if (this.tabIndex === 0) {
      document.getElementById('login-email').focus();
    } else {
      document.getElementById('register-name').focus();
    }
  }

  onChange() {
    this.tabIndex = this.tabIndex === 0 ? 1 : 0;
    this.select(this.tabIndex);
  }

  render() {
    return (
      <section id="login-form-container">
        <div id="login-form">
          <Tabs onChange={this.onChange}>
            <Tab label="Login">
              <div>
                <LoginForm />
              </div>
            </Tab>
            <Tab label="Register">
              <div>
                <RegisterForm />
              </div>
            </Tab>
          </Tabs>
        </div>
      </section>
    );
  }
}

export default Login;
