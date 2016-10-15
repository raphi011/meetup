import React, {Component} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Tabs, Tab} from 'react-mdl';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }

  componentDidMount() {
    window.componentHandler.upgradeAllRegistered();
  }

  render() {
    let currentTab;

    if (this.state.activeTab === 0) {
      currentTab = <LoginForm />;
    } else {
      currentTab = <RegisterForm />;
    }

    return (
      <section id="login-form-container">
        <div id="login-form">
          <Tabs activeTab={this.state.activeTab} onChange={tabId => this.setState({ activeTab: tabId })} ripple>
            <Tab>Login</Tab>
            <Tab>Register</Tab>
          </Tabs>
          {currentTab}
        </div>
      </section>
    );
  }
}

export default Login;
