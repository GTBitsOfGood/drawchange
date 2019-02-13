import React from 'react';
import { Container, Col, Row, Label } from 'reactstrap';
import styles from '../../styles/AppInfo.module.css';
import { Heading, OptionsSelected } from '../Shared';

const ApplicantInfo = ({ applicant }) => (
  <div className={styles.container}>
    {applicant && (
      <Container>
        {console.log(applicant)}
        <Row>
          <Col>
            <h2 className={styles.header}>
              <Label for="exampleName">{applicant ? applicant.bio.first_name : ''}</Label>
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5 className={styles.label}>
              <Label for="exampleEmail">Email</Label>
            </h5>
            <p className={styles.content}>{applicant ? applicant.bio.email : ''}</p>
          </Col>
          <Col>
            <h5 className={styles.label}>
              <Label for="examplePhoneNumber">Phone Number</Label>
            </h5>
            <p className={styles.content}>{applicant ? applicant.bio.phone_number : ''}</p>
          </Col>
          <Col>
            <h5 className={styles.label}>
              <Label for="exampleBirthday">Birth Date</Label>
            </h5>
            <p className={styles.content}>{applicant ? applicant.bio.date_of_birth : ''}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5 className={styles.label}>
              <Label for="exampleAddress">Address</Label>
            </h5>
            <p className={styles.content}>
              {applicant
                ? applicant.bio.street_address +
                  ' ' +
                  applicant.bio.state +
                  ' ' +
                  applicant.bio.zip_code
                : ''}
            </p>
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
              <Label for="volunteerInterest">Volunteer Interest Cause</Label>
            </h5>
            <p className={styles.content}>
              {applicant.history ? applicant.history.volunteer_interest_cause : ''}
            </p>
          </Col>
          <Col>
            <h5 className={styles.label}>
              <Label for="volunteerSupport">Volunteer Support</Label>
            </h5>
            <p className={styles.content}>
              {applicant.history ? applicant.history.volunteer_support : ''}
            </p>
          </Col>
          <Col>
            <h5 className={styles.label}>
              <Label for="volunteerCommittment">Volunteer Committment</Label>
            </h5>
            <p className={styles.content}>
              {applicant.history ? applicant.history.committment : ''}
            </p>
          </Col>
          <Col>
            <h5 className={styles.label}>
              <Label for="previouseExperience">Previous Experience</Label>
            </h5>
            <p className={styles.content}>
              {applicant.history ? applicant.history.previous_experience : ''}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4 className={styles.header}>
              <Label for="exampleAvailability">Availability</Label>
            </h4>
          </Col>
        </Row>
      </Container>
    )}
  </div>
);

export default ApplicantInfo;
