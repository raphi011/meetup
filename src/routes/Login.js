import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }

  render() {
    return (
      <section id="login-form-container">
        <div id="login-form">
          <Tabs>
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
