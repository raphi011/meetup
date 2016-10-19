import Base from '../core/firebase';

let initialized = false;
export let currentUser = null;

function isLoggedIn() {
  return currentUser !== null;
}

function requireAuth(nextState, replace, callback) {
  if (initialized) {
    console.log('initialized, isloggedin: ' + isLoggedIn());
    setPathname(isLoggedIn(), nextState, replace);
    callback();
  } else {
    Base.onAuth(user => {
      console.log('setting currentUser');
      currentUser = user;
      if (!initialized) {
        initialized = true;
        setPathname(isLoggedIn(), nextState, replace);
        callback();
      }
    });
  }
}

function setPathname(isLoggedIn, nextState, replace) {
  if (!isLoggedIn) {
    console.log('not allowed');
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

export default requireAuth;
