import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import { Route } from 'react-router-dom';

import Intro from './Intro';
import Footer from './Footer';
import AcceptPolicies from '../AcceptPolicies';
import ApplicantViewer from '../AdminDash/ApplicantViewer';

import styled from 'styled-components';
import { IMAGES } from '../../images/gallery';

const Container = styled.div`
  background: white;
  height: 100%;
  width: 100%;
`;

const GalleryContainer = styled.div`
  min-height: 1px;
  display: block;
  text-align: center;
  width: 100%;
  overflow: auto;
`;

export default class VolunteerDashboard extends Component {
  state = {
    hasPolicies: true
  };

  handlePolicies = _ => this.setState({ hasPolicies: true });
  render() {
    return this.state.hasPolicies ? (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <Intro />
              <GalleryContainer>
                <Gallery enableImageSelection={false} maxRows={1} images={IMAGES} />
              </GalleryContainer>
              <Footer />
            </React.Fragment>
          )}
        />
        <Route
          path="/applicant-viewer"
          render={() => (
            <Container>
              <ApplicantViewer />
            </Container>
          )}
        />
      </React.Fragment>
    ) : (
      <AcceptPolicies onSubmit={this.handlePolicies} />
    );
  }
}
