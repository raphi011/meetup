import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Layout from './Layout';
import Home from './routes/Home';
import Login from './routes/Login';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="login" component={Login} />
    </Route>
  </Router>,
  document.getElementById('root')
);
