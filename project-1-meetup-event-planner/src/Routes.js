import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Layout from './Layout';
import Home from './routes/Home';
import Login from './routes/Login';
import New from './routes/New';
import Base from './core/firebase';

const auth = {
  initialized: false,
  authenticated: false,
  interval: -1,
  user: null
};

Base.onAuth(user => {
  if (user) {
    auth.authenticated = true;
    auth.user = user;
  } else {
    auth.authenticated = false;
    auth.user = null;
  }

  auth.initialized = true;
});

function renderComponent(Component) {
  return function(props) {
    return <Component user={auth.user} {...props} />;
  };
}

function requireAuth(nextState, replace, callback) {
  if (!auth.initialized) {
    auth.interval = setInterval(() => {
      if (auth.initialized) {
        clearInterval(auth.interval);
        setPathname(nextState, replace, callback);
      }
    }, 100);
  } else {
    setPathname(nextState, replace, callback);
  }
}

function setPathname(nextState, replace, callback) {
  if (!auth.authenticated) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
  callback();
}


export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={renderComponent(Home)} onEnter={requireAuth} />
          <Route path="new" component={renderComponent(New)} onEnter={requireAuth} />
          <Route path="login" component={renderComponent(Login)} />
        </Route>
      </Router>
    );
  }
}
