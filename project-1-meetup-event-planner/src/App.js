import React, { Component } from 'react';
import Header from './Header';

import 'normalize.css';
import './styles/global.scss';
import 'sprint-js/sprint.js';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default App;
