import React from 'react';
import Base from '../core/firebase';

function handleLogout() {
  Base.unauth();
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
