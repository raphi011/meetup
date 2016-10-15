import React from 'react';
import Base from '../core/firebase';

function handleLogout() {
  Base.unauth();
}

const Logout = ({className}) => {
  return (
    <a href="#" onClick={handleLogout} className={className}>logout</a>
  );
};

Logout.propTypes = {
  className: React.PropTypes.string
};

export default Logout;
