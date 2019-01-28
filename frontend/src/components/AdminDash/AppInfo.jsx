import React, { Component } from 'react';
import { Container, Col, Row, Progress, Label, Button } from 'reactstrap'
import styles from '../../styles/AppInfo.module.css';

const userData = [
  {
    role: 'volunteer',
    bio: {
      first_name: 'John',
      last_name: 'Adams',
      phone_number: '(888)-888-8888',
      email: 'jadams@foundingfathers.gov',
      date_of_birth: 'October 31, 1735',
      street_address: '350 Ferst Drive',
      city: 'Atlanta',
      state: 'Georgia',
      zip_code: '30332'
    },
    history: {
      volunteer_interest_cause: 'Well, I just helped found a nation and finally have some time to give back to my community. This cause really caught my eye!',
      volunteer_support: 'I value the pursuit of happiness and collaborating with other brothers and sisters of our great nation.',
      volunteer_commitment: 'Due to my obligations to restructuring the government, I must be honest and let you know that I cannot be 100% committed.',
      previous_volunteer_experience: 'Not sure if you would call it volunteer work, but there was certainly a lot of work with no pay'
    },
    availability: {
      weekday_mornings: true,
      weekday_afternoons: true,
      weekday_evenings: false,
      weekend_mornings: false,
      weekend_afternoons: true,
      weekend_evenings: false
    }
  }
];

export default class AppInfo extends Component {
  render() {
    const { name, email } = this.props;
    return (
      <div className={styles.container}>
        <Container>
          <Row>
            <Col>
              <h2 className={styles.header}>
                <Label for="exampleName">{name}</Label>
              </h2>
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
              <p className={styles.content}>
                {userData[0].bio.phone_number}
              </p>
            </Col>
            <Col>
              <h5 className={styles.label}>
                <Label for="exampleBirthday">Birth Date</Label>
              </h5>
              <p className={styles.content}>
                {userData[0].bio.date_of_birth}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5 className={styles.label}>
                <Label for="exampleAddress">Address</Label>
              </h5>
              <p className={styles.content}>
                {userData[0].bio.street_address + " " + userData[0].bio.city + ", " + userData[0].bio.state + " " + userData[0].bio.zip_code}
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
                <Label for="exampleVolunteerInterest">Volunteer Interest Cause</Label>
              </h5>
              <p className={styles.content}>
                {userData[0].history.volunteer_interest_cause}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5 className={styles.label}>
                <Label for="exampleVolunteerCommitment">Volunteer Commitment</Label>
              </h5>
              <p className={styles.content}>
                {userData[0].history.volunteer_commitment}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5 className={styles.label}>
                <Label for="exampleVolunteerSupport">Volunteer Support</Label>
              </h5>
              <p className={styles.content}>
                {userData[0].history.volunteer_support}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5 className={styles.label}>
                <Label for="examplePreviousExperience">Previous Volunteer Experience</Label>
              </h5>
              <p className={styles.content}>
                {userData[0].history.previous_volunteer_experience}
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
          <Row>
            <Col>
              <h6 className={styles.label}>
                <Label for="exampleWeekday">Weekday</Label>
              </h6>
              <Row>
                <Button color="primary" size="sm" disabled>Mornings</Button>{' '}
                <Button color="primary" size="sm" active>Afternoons</Button>{' '}
                <Button color="primary" size="sm" active>Evenings</Button>{' '}
              </Row>
            </Col>
            <Col>
              <h6 className={styles.label}>
                <Label for="exampleWeekday">Weekend</Label>
              </h6>
              <Row>
                <Button color="primary" size="sm" active>Mornings</Button>{' '}
                <Button color="primary" size="sm" disabled>Afternoons</Button>{' '}
                <Button color="primary" size="sm" disabled>Evenings</Button>{' '}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
