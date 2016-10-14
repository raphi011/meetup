import React from 'react';
import {Link} from 'react-router';

const Header = () => {
  return (
    <header className="mdl-layout__header mdl-layout__header--scroll">
      <div className="mdl-layout__header-row">
        <span className="mdl-layout-title">meetup</span>
        <div className="mdl-layout-spacer"></div>
        <nav className="mdl-navigation">
          <Link to="/login" className="mdl-navigation__link">login</Link>
          <Link to="/register" className="mdl-navigation__link">register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
