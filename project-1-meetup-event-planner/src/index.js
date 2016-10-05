import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

import App from './App';
import Home from './Home';
import Register from './Register';
import Login from './Login';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="register" component={Register}/>
      <Route path="login" component={Login}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
