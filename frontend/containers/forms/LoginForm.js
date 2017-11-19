import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Control, Form, actions } from 'react-redux-form';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import { bindActionCreators } from 'redux';
// Local Components
import { login } from '../../actions/auth';

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
    <div>
      <Form
        model="myForms.user"
        onSubmit={this.props.login}
      >
        <label htmlFor=".email">Email:</label>
        <br/>
        <Control.text type="email" model=".email" id=".email" />
        <br/>

        <label htmlFor=".password">Password:</label>
        <br/>
        <Control.text type="password" model=".password" id=".password" />
        <br/>

        <br/>
        <button type="submit">
          Login
        </button>
        <ReduxSweetAlert />
      </Form>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.loginFailed,
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign(
    {},
    { swal: bindActionCreators(swal, dispatch) },
    { close: bindActionCreators(close, dispatch) },
    { login: () => dispatch(login()) }
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);