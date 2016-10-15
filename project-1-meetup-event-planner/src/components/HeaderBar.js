import React, {Component} from 'react';
import {Link} from 'react-router';
import Logout from './Logout';
import Base from '../core/firebase';
import {Header, Navigation} from 'react-mdl';

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

  render() {
    var link;

    if (this.state.user === null) {
      link = <Link to="/login" className="mdl-navigation__link">login</Link>;
    } else {
      link = <Logout className="mdl-navigation__link" />;
    }

    return (
      <Header title="meetup" scroll>
        <Navigation>
          {link}
        </Navigation>
      </Header>
    );
  }
}

export default HeaderBar;
