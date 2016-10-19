import React from 'react';
import { browserHistory } from 'react-router';
import Base from '../core/firebase';

function handleLogout() {
  Base.unauth();
  browserHistory.push('/login');
}

const LogoutLink = ({className}) => {
  return (
    <a href="#" onClick={handleLogout} className={className}>logout</a>
  );
};

LogoutLink.propTypes = {
  className: React.PropTypes.string
};

export default LogoutLink;
