import React, { Component } from 'react';
import { Container, Col, Row, Label, Button, Input } from 'reactstrap';
import styles from '../../styles/AppInfo.module.css';
import { Heading, OptionsSelected } from '../Shared';
import _ from 'lodash';

const getLabelsFromDays = (availability, type) => {
  return Object.keys(availability)
    .filter(day => day.includes(type))
    .map(day => {
      if (day.includes('mornings')) return 'Mornings';
      else if (day.includes('afternoons')) return 'Afternoons';
      else if (day.includes('evenings')) return 'Evenings';
      return '';
    });
};

const getSelectedFromDays = (availability, type) => {
  return getLabelsFromDays(_.pickBy(availability, (value, key) => value), type);
};

class ApplicantInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingMode: false,
      commentText: ''
    };
  }

  render() {
    const { applicant } = this.props;
    return (
      <div className={styles.container}>
        {applicant && (
          <Container>
            <Row>
              <Col>
                <Heading>{`${applicant.bio.first_name} ${applicant.bio.last_name}`}</Heading>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 className={styles.label}>
                  <Label for="exampleEmail">Email</Label>
                </h5>
                <p className={styles.content}>{applicant.bio.email}</p>
              </Col>
              <Col>
                <h5 className={styles.label}>
                  <Label for="examplePhoneNumber">Phone Number</Label>
                </h5>
                <p className={styles.content}>{applicant.bio.phone_number}</p>
              </Col>
              <Col>
                <h5 className={styles.label}>
                  <Label for="exampleBirthday">Birth Date</Label>
                </h5>
                <p className={styles.content}>{applicant.bio.date_of_birth}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 className={styles.label}>
                  <Label for="exampleAddress">Address</Label>
                </h5>
                <p className={styles.content}>
                  {`${applicant.bio.street_address} ${applicant.bio.city}, ${applicant.bio.state} ${
                    applicant.bio.zip_code
                  }`}
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
            </Row>
            <Row>
              <Col>
                <h5 className={styles.label}>
                  <Label for="volunteerSupport">Volunteer Support</Label>
                </h5>
                <p className={styles.content}>
                  {applicant.history ? applicant.history.volunteer_support : ''}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 className={styles.label}>
                  <Label for="volunteerCommittment">Volunteer Committment</Label>
                </h5>
                <p className={styles.content}>
                  {applicant.history ? applicant.history.volunteer_commitment : ''}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 className={styles.label}>
                  <Label for="previousExperience">Previous Experience</Label>
                </h5>
                <p className={styles.content}>
                  {applicant.history ? applicant.history.previous_volunteer_experience : ''}
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4 className={styles.header}>
                  <Label for="exampleAvailability">Availability</Label>
                </h4>
                <Row>
                  <Col>
                    <OptionsSelected
                      options={getLabelsFromDays(applicant.availability, 'weekday')}
                      selected={getSelectedFromDays(applicant.availability, 'weekday')}
                    />
                  </Col>
                  <Col>
                    <OptionsSelected
                      options={getLabelsFromDays(applicant.availability, 'weekend')}
                      selected={getSelectedFromDays(applicant.availability, 'weekend')}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col style={{ marginTop: 10 }}>
                <h5>Comments</h5>
                {applicant.comments &&
                  applicant.comments.map(comment => <p className={styles.content}>{comment}</p>)}
                {!this.state.editingMode && (
                  <Button color="primary" onClick={() => this.setState({ editingMode: true })}>
                    Add a Comment
                  </Button>
                )}
                {this.state.editingMode && (
                  <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <Input
                      type="textarea"
                      onChange={e => this.setState({ commentText: e.target.value })}
                    />
                    <Button
                      onClick={() => {
                        this.setState({ editingMode: false });
                        this.props.onChangeComment(this.state.commentText);
                      }}
                    >
                      Edit Comment
                    </Button>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

export default ApplicantInfo;
