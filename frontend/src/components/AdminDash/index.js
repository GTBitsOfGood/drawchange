import React from 'react';
import styled, { withTheme } from 'styled-components';
import { Route } from 'react-router-dom';
import ApplicantViewer from './ApplicantViewer';

const Container = styled.div`
  background: white;
  height: 100%;
  width: 100%;
`;

class AdminDash extends React.Component {
  componentDidMount = () => {
    window.history.pushState({}, 'Applicant Viewer', 'applicant-viewer');
  };
  render() {
    return (
      <Container>
        <Route path="/applicant-viewer" component={ApplicantViewer} />
        <Route path="/user-manager" component={ApplicantViewer} />
      </Container>
    );
  }
}
export default withTheme(AdminDash);
