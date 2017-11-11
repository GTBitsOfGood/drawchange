// NPM Packages
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';

// Local Imports
import * as actions from '../actions/authentication';


class Login extends Component {

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
        <FormGroup controlId={"username"}>
          <ControlLabel>{"Username"}</ControlLabel>
          <FormControl type={"text"} value={this.props.username} onChange={(e) => this.props.loginUsernameChange(e.target.value)} />
        </FormGroup>
        <FormGroup controlId={"password"}>
          <ControlLabel>{"Password"}</ControlLabel>
          <FormControl type={"password"} value={this.props.password} onChange={(e) => this.props.loginPasswordChange(e.target.value)} />
        </FormGroup>
        <Button type="submit" onClick={() => this.props.login()}>
          Login
      </Button>
        <ReduxSweetAlert />
      </div>
    );
  }
}

Login.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  loginPasswordChange: PropTypes.func,
  loginUsernameChange: PropTypes.func,
  login: PropTypes.func,
  error: PropTypes.bool,
  swal: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => {
  return {
    error: state.auth.loginFailed,
    username: state.auth.loginUsername,
    password: state.auth.loginPassword
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign(
    {},
    { swal: bindActionCreators(swal, dispatch) },
    { close: bindActionCreators(close, dispatch) },
    bindActionCreators(actions, dispatch)
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);