import Base from '../core/firebase';

function requireAuth(nextState, replace) {
  var isLoggedIn = Base.auth().currentUser !== null;
  if (!isLoggedIn) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

export default requireAuth;
