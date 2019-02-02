import React from 'react';
import { Container, Col, Row, Label, Button } from 'reactstrap';
import styles from '../../styles/AppInfo.module.css';
import Heading from '../styled/Heading';

const ApplicantInfo = ({ name, email, phoneNumber, birthDate, address, bio }) => (
  <div className={styles.container}>
    <Container>
      <Row>
        <Col>
          <Heading text={name} />
        </Col>
      </Row>
      <Row>
        <Col>
          <h5 className={styles.label}>
            <Label for="exampleEmail">Email</Label>
          </h5>
          <p className={styles.content}>{email}</p>
        </Col>
        <Col>
          <h5 className={styles.label}>
            <Label for="examplePhoneNumber">Phone Number</Label>
          </h5>
          <p className={styles.content}>{phoneNumber}</p>
        </Col>
        <Col>
          <h5 className={styles.label}>
            <Label for="exampleBirthday">Birth Date</Label>
          </h5>
          <p className={styles.content}>{birthDate}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5 className={styles.label}>
            <Label for="exampleAddress">Address</Label>
          </h5>
          <p className={styles.content}>{address}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className={styles.header}>
            <Label for="history">History</Label>
          </h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5 className={styles.label}>
            <Label for="exampleVolunteerInterest">Volunteer Interest Cause</Label>
          </h5>
          <p className={styles.content}>{bio.interestCause}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5 className={styles.label}>
            <Label for="exampleVolunteerCommitment">Volunteer Commitment</Label>
          </h5>
          <p className={styles.content}>{bio.commitment}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5 className={styles.label}>
            <Label for="exampleVolunteerSupport">Volunteer Support</Label>
          </h5>
          <p className={styles.content}>{bio.support}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5 className={styles.label}>
            <Label for="examplePreviousExperience">Previous Volunteer Experience</Label>
          </h5>
          <p className={styles.content}>{bio.previousExperience}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className={styles.header}>
            <Label for="exampleAvailability">Availability</Label>
          </h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <h6 className={styles.label}>
            <Label for="exampleWeekday">Weekday</Label>
          </h6>
          <Row>
            <Button color="primary" size="sm" disabled>
              Mornings
            </Button>{' '}
            <Button color="primary" size="sm" active>
              Afternoons
            </Button>{' '}
            <Button color="primary" size="sm" active>
              Evenings
            </Button>{' '}
          </Row>
        </Col>
        <Col>
          <h6 className={styles.label}>
            <Label for="exampleWeekday">Weekend</Label>
          </h6>
          <Row>
            <Button color="primary" size="sm" active>
              Mornings
            </Button>{' '}
            <Button color="primary" size="sm" disabled>
              Afternoons
            </Button>{' '}
            <Button color="primary" size="sm" disabled>
              Evenings
            </Button>{' '}
          </Row>
        </Col>
      </Row>
    </Container>
  </div>
);

export default ApplicantInfo;
