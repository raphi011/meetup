import React from 'react';
import { Link } from 'react-router'

const Header = () => {
  return (
    <header>
      <nav>
        <div className="sub-navigation">
          <ul>
            <li><Link to="/login">login</Link></li>
            <li><Link to="/register">register</Link></li>
          </ul>
        </div>
        <a href="/" id="header-logo">
          <h1>meetup</h1>
        </a>
      </nav>
      <hr />
    </header>
  );
}

export default Header;
