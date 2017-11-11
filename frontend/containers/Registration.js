// NPM Packages
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';

// Local Components
import * as actions from '../actions/auth';


class Registration extends Component {
  constructor() {
    super();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.props.swal({
        title: "Registration Failed!",
        type: "error",
        confirmButtonText: "Ok"
      });
    } else if (nextProps.success) {
      this.props.swal({
        title: "Registration Success!",
        text: "Now Please Login",
        type: "success",
        confirmButtonText: "Ok"
      });
    }
  }

  render() {
    return (
      <div>
        <FormGroup controlId={"name"}>
          <ControlLabel>{"Name"}</ControlLabel>
          <FormControl type={"text"} value={this.props.name} onChange={(e) => this.props.nameChange(e.target.value)} />
        </FormGroup>
        <FormGroup controlId={"username"}>
          <ControlLabel>{"Username"}</ControlLabel>
          <FormControl type={"text"} value={this.props.username} onChange={(e) => this.props.usernameChange(e.target.value)} />
        </FormGroup>
        <FormGroup controlId={"password"}>
          <ControlLabel>{"Password"}</ControlLabel>
          <FormControl type={"password"} value={this.props.password} onChange={(e) => this.props.passwordChange(e.target.value)} />
        </FormGroup>
        <Button type="submit" onClick={() => this.props.register()}>
          Register
      </Button>
        <ReduxSweetAlert />
      </div>
    );
  }
}


Registration.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  password: PropTypes.string,
  success: PropTypes.bool,
  nameChange: PropTypes.func,
  passwordChange: PropTypes.func,
  usernameChange: PropTypes.func,
  register: PropTypes.func,
  error: PropTypes.bool,
  swal: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => {
  return {
    error: state.auth.registrationFailed,
    success: state.auth.registrationSuccess,
    name: state.auth.name,
    username: state.auth.username,
    password: state.auth.password
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

export default connect(mapStateToProps, mapDispatchToProps)(Registration);