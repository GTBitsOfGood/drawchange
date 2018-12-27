import React, { Component } from 'react';

import VolunteerApp from '../VolunteerApp';
import AcceptPolicies from '../AcceptPolicies';

export default class VolunteerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasApplied: false,
      hasPolicies: false
    };
  }

  handleApply = _ => this.setState({ hasApplied: true });
  handlePolicies = _ => this.setState({ hasPolicies: true });
  render() {
    return (
      <div>
        {!this.state.hasApplied && <VolunteerApp onSubmit={this.handleApply} />}
        {this.state.hasApplied && !this.state.hasPolicies && (
          <AcceptPolicies onSubmit={this.handlePolicies} />
        )}
        {this.state.hasApplied && this.state.hasPolicies && <h1>Volunteer Dashboard :) </h1>}
      </div>
    );
  }
}
