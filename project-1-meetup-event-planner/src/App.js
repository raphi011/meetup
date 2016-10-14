import React from 'react';

import 'normalize.css';
import 'sprint-js/sprint';

import Header from './Header';
import './styles/global.scss';

const App = props =>
  <div>
    <Header />
    <main>
      {props.children}
    </main>
  </div>;

App.propTypes = {
  children: React.PropTypes.any
};

export default App;
