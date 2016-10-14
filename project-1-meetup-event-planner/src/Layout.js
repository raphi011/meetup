import React from 'react';

// import 'normalize.css';
import 'sprint-js/sprint';

import Header from './components/Header';
import './styles/global.scss';

const App = props =>
  <div className="mdl-layout mdl-layout--no-drawer-button mdl-js-layout mdl-layout--fixed-header">
    <Header />
    <main className="mdl-layout__content">
      <div className="page-content">
        {props.children}
      </div>
    </main>
  </div>;

App.propTypes = {
  children: React.PropTypes.any
};

export default App;
