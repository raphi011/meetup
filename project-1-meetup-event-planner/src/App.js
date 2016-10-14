import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import Layout from './Layout';
import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="register" component={Register} />
      <Route path="login" component={Login} />
    </Route>
  </Router>,
  document.getElementById('root')
);
