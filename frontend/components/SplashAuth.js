// NPM Imports
import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';

import LoginForm from '../containers/forms/LoginForm';
import RegistrationForm from '../containers/forms/RegistrationForm';


class SplashAuth extends Component {
  constructor() {
    super();

    this.state = {
      login: true,
      header: "Sign In",
      text: "Register"
    };

    this._switchState = this._switchState.bind(this);
  }

  _switchState(e) {
    e.preventDefault();
    if (this.state.login) {
      this.setState({
        login: false,
        header: "Sign Up",
        text: "Login"
      });
    } else {
      this.setState({
        login: true,
        header: "Sign In",
        text: "Register"
      });
    }
  }

  render() {
    return (
      <div>
        <Panel header={<h3>{this.state.header}</h3>} bsStyle="success">
          { this.state.login ? <LoginForm /> : <RegistrationForm /> }
          <a href={''} onClick={this._switchState}>
            Click here to {this.state.text}
          </a>
        </Panel>

      </div>
    );
  }

}


export default SplashAuth;

