import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import Home from './Home';

import 'normalize.css';
import './styles/global.scss';

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Home}/>
      </Router>
    );
  }
}

export default App;
