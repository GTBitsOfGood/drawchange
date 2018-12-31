import React, { Component } from 'react';

import VolunteerApp from '../VolunteerApp';
import AcceptPolicies from '../AcceptPolicies';
import Intro from './Intro';
import styles from '../../styles/VolunteerDash.module.css';
import {IMAGES} from '../../images/volunteer_app/images.js';
import Gallery from 'react-grid-gallery';
import Footer from './Footer'

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
      {this.state.hasApplied && this.state.hasPolicies && <div>
          <Intro />
          <div className={styles.gallery}>
            <Gallery enableImageSelection={false} maxRows={1} images={IMAGES} />
          </div>
          <Footer googleClick={this.props.onAuth} />
        </div>}
      </div>
    );
  }
}
