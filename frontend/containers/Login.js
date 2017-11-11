// NPM Packages
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';

// Local Imports
import * as actions from '../actions/auth';


class Login extends Component {
  constructor(props) {
    super(props);

    this._emailChange = this._emailChange.bind(this);
    this._passwordChange = this._passwordChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.props.swal({
        title: "Login Failed!",
        type: "error",
        confirmButtonText: "Ok"
      });
    }
  }

  _emailChange(e) {
    this.props.loginEmailChange(e.target.value);
  }

  _passwordChange(e) {
    this.props.loginPasswordChange(e.target.value);
  }

  render() {
    return (
      <div>
        <FormGroup controlId={"email"}>
          <ControlLabel>{"Email"}</ControlLabel>
          <FormControl type={"email"} value={this.props.email} onChange={this._emailChange} />
        </FormGroup>
        <FormGroup controlId={"password"}>
          <ControlLabel>{"Password"}</ControlLabel>
          <FormControl type={"password"} value={this.props.password} onChange={this._passwordChange} />
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
  email: PropTypes.string,
  password: PropTypes.string,
  loginPasswordChange: PropTypes.func,
  loginEmailChange: PropTypes.func,
  login: PropTypes.func,
  error: PropTypes.bool,
  swal: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => {
  return {
    error: state.auth.loginFailed,
    email: state.auth.loginEmail,
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