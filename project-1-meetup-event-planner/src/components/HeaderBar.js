import React, {Component} from 'react';
import {Link} from 'react-router';
import Base from '../core/firebase';
import {browserHistory} from 'react-router';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  title: {
    cursor: 'pointer'
  }
};

class HeaderBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    Base.onAuth(this.onLogin.bind(this));
  }

  onLogin(user) {
    this.setState({user});
  }

  handleLogout() {
    Base.unauth();
    browserHistory.push('/login');
  }

  handleTouchTap() {
    browserHistory.push('/');
  }

  render() {
    var button;

    if (this.state.user === null) {
      button = <FlatButton onClick={() => browserHistory.push('/login')} label="login" />;
    } else {
      button = <FlatButton onClick={this.handleLogout} label="logout" />;
    }

    return (
      <AppBar
        title={<span style={styles.title}>meetup</span>}
        onTitleTouchTap={this.handleTouchTap}
        showMenuIconButton={false}
        iconElementRight={button}
      />
    );
  }
}

export default HeaderBar;
