import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Control, Form, actions } from 'react-redux-form';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/lib/Button';
import { Link } from 'react-router-dom';
// Local Components
import { login } from '../../actions/auth';
import Text from '../../components/inputs/Text';


class LoginForm extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.props.swal({
        title: "Login Failed!",
        type: "error",
        confirmButtonText: "Ok"
      });
    }
  }

  render() {
    return (
    <Form model="myForms.user.bio"  >
        <Control required component={Text} model=".email" label="Email" type="email" />
        <Control required component={Text} model=".password" label="Password" type="password" />
        <Button bsStyle="primary" onClick={this.props.login} >Login</Button>
        <Link to={"/register"}>Click Here to Register</Link>
        <ReduxSweetAlert />
    </Form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func,
  error: PropTypes.bool,
  swal: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,

};

function mapStateToProps(state) {
  return {
    error: state.auth.loginFailed,
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign(
    {},
    { swal: bindActionCreators(swal, dispatch) },
    { close: bindActionCreators(close, dispatch) },
    { login: () => dispatch(login()) }
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);