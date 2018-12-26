import React, { Component } from 'react';

import { Container, Row, Col, Button, Jumbotron } from 'reactstrap';
import { SocialIcon } from 'react-social-icons';

class AcceptPolicies extends Component {
  state = { readVM: false, readCPC: false };
  delay = 5000; // 5 seconds

  handleReadVM = _ => {
    window.open(
      'https://docs.google.com/document/d/14QEpMwgJzjyBX27dfNsbKoxV_VEjF8IwbQGEIadMMOo/edit',
      '_blank'
    );
    setTimeout(_ => this.setState({ readVM: true }), this.delay);
    return false;
  };

  handleReadCPC = _ => {
    window.open(
      'https://docs.google.com/document/d/14QEpMwgJzjyBX27dfNsbKoxV_VEjF8IwbQGEIadMMOo/edit',
      '_blank'
    );
    setTimeout(_ => this.setState({ readCPC: true }), this.delay);
    return false;
  };

  render() {
    const { readVM, readCPC } = this.state;
    const read = readVM && readCPC;
    return (
      <Container>
        <Row>
          <Col md={{ offset: 2, size: 8 }}>
            <Jumbotron
              style={{
                marginTop: '50px',
                backgroundColor: 'rgb(255, 220, 172)',
                borderRadius: '.9rem'
              }}
            >
              <h1 className="display-3">Congratulations!</h1>
              <p className="lead">
                We have reviewed your application and are thrilled to have you join our team!
              </p>
              <hr className="my-2" />
              <p>
                Before you may start volunteering with drawchange, you must read and agree to the
                terms and conditions outlined in the Volunteer Manual and Child Protection Clause.
              </p>
              <p className="lead">
                <Button
                  onClick={this.handleReadVM}
                  color={readVM ? 'success' : 'danger'}
                  style={{ marginRight: '10px' }}
                >
                  Read Volunteer Manual
                </Button>
                <Button onClick={this.handleReadCPC} color={readCPC ? 'success' : 'danger'}>
                  Read Child Protection Clause
                </Button>
              </p>
              <p className="lead">
                <Button disabled={!read} color={read ? 'primary' : 'secondary'}>
                  {read ? 'Continue' : 'Please Read the Policies Before Continuing'}
                </Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AcceptPolicies;
