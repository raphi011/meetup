import React, {Component} from 'react';
import {Link} from 'react-router';
import LogoutLink from './LogoutLink';
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
      link = <Link to="/login">login</Link>;
    } else {
      link = <LogoutLink />;
    }

    const title = <Link to="/" id="title" >meetup</Link>

    return (
      <Header title={title} scroll>
        <Navigation>
          {link}
        </Navigation>
      </Header>
    );
  }
}

export default HeaderBar;
