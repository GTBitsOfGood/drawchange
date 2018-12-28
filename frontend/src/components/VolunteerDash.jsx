import React, { Component } from 'react';

import AcceptPolicies from './AcceptPolicies';

export default class VolunteerDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPolicies: false
    };
  }

  handlePolicies = _ => this.setState({ hasPolicies: true });
  render() {
    return (
      <div>
        {this.state.hasPolicies ? (
          <h1>Volunteer Dashboard :) </h1>
        ) : (
          <AcceptPolicies onSubmit={this.handlePolicies} />
        )}
      </div>
    );
  }
}
