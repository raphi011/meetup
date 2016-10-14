import {connect} from 'react-redux';
import {register} from '../actions';
import RegisterForm from '../components/RegisterForm';

const mapDispatchToProps = dispatch => {
  return {
    register: (name, email, password, birthday) => {
      dispatch(register(name, email, password, birthday));
    }
  };
};

const RegisterFormContainer = connect(
  null,
  mapDispatchToProps
)(RegisterForm);

export default RegisterFormContainer;
