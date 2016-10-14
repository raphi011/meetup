import {connect} from 'react-redux';
import {login} from '../actions';
import Login from '../components/Login';

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => {
      dispatch(login(email, password));
    }
  };
};

const LoginContainer = connect(
  null,
  mapDispatchToProps
)(Login);

export default LoginContainer;
