import React, { Component } from 'react';
import VolunteerDashboard from './Volunteer';
import AdminDashboard from './Admin';

export default class Dashboard extends Component {
  isAdmin() {
    // TODO: Should check a key on this.props.user
    return false;
  }

  getDashboard() {
    if (this.isAdmin()) return AdminDashboard;
    return VolunteerDashboard;
  }

  render() {
    const Dash = this.getDashboard();
    return <Dash />;
  }
}
