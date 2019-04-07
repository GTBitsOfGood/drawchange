import React, { Component } from 'react';
import { Button, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import styles from '../../styles/AppInfo.module.css';
import { OptionsSelected } from '../Shared';
import { getStatusLabel } from './statusHelpers';
import StatusDropdown from './StatusDropdown';
import styled from 'styled-components';
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

const Heading = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 2rem;
  h1 {
    margin-right: auto;
    margin-bottom: 1rem;
  }
  @media (max-width: 60rem) {
    flex-direction: column;
  }
`;

const Section = styled.section`
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;

  h5 {
    font-size: 1rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.grey5};
    font-weight: 600;
    width: 100%;
  }

  h4 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    width: 100%;
  }

  p {
    font-size: 1rem;
  }
`;

const SubSection = styled.div`
  flex: 1;
  display: inline-block;
  margin-right: 1rem;
  min-width: ${props => props.minWidth || '15rem'};
`;

const Container = styled.div`
  padding: 2rem;
  width: 100%;
`;

const InputContainer = styled.div`
  padding-left: 10;
  padding-right: 10;
`;

class ApplicantInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingMode: false,
      commentText: ''
    };
  }

  render() {
    const { applicant, onUpdateApplicantStatus } = this.props;
    return (
      <div className={styles.container}>
        {applicant && (
          <Container>
            <Section>
              <Heading>
                <h1>{`${applicant.bio.first_name} ${applicant.bio.last_name}`}</h1>
                <StatusDropdown
                  updateStatusCallback={status =>
                    onUpdateApplicantStatus(applicant.bio.email, status)
                  }
                  status={applicant.status}
                />
              </Heading>
              <SubSection>
                <h5>Role</h5>
                <p className={styles.content}>{getStatusLabel(applicant.role)}</p>
              </SubSection>
              <SubSection>
                <h5>Email</h5>
                <p className={styles.content}>{applicant.bio.email}</p>
              </SubSection>
              <SubSection>
                <h5>Phone Number</h5>
                <p className={styles.content}>{applicant.bio.phone_number}</p>
              </SubSection>
              <SubSection>
                <h5>Birth date</h5>
                <p className={styles.content}>{applicant.bio.date_of_birth}</p>
              </SubSection>
              <SubSection>
                <h5 className={styles.label}>Address</h5>
                <p className={styles.content}>
                  {`${applicant.bio.street_address} ${applicant.bio.city}, ${applicant.bio.state} ${
                    applicant.bio.zip_code
                  }`}
                </p>
              </SubSection>
            </Section>
            {applicant.history && (
              <Section>
                <h4>History</h4>
                <h5>Volunteer Interest Cause</h5>
                <p>{applicant.history.volunteer_interest_cause}</p>
                <h5>Volunteer Support</h5>
                <p>{applicant.history.volunteer_interest_cause}</p>
                <h5>Volunteer Commitment</h5>
                <p>{applicant.history.volunteer_commitment}</p>
                <h5>Previous Experience</h5>
                <p>{applicant.history.previous_volunteer_experience}</p>
              </Section>
            )}
            <Section>
              <h4>Availability</h4>
              <SubSection minWidth="20rem">
                <h5>Weekdays</h5>
                <OptionsSelected
                  options={getLabelsFromDays(applicant.availability, 'weekday')}
                  selected={getSelectedFromDays(applicant.availability, 'weekday')}
                />
              </SubSection>
              <SubSection minWidth="20rem">
                <h5>Weekends</h5>
                <OptionsSelected
                  options={getLabelsFromDays(applicant.availability, 'weekend')}
                  selected={getSelectedFromDays(applicant.availability, 'weekend')}
                />
              </SubSection>
            </Section>
            <Section>
              <SubSection>
                <h5>Comments</h5>
                {!this.state.editingMode && applicant.comments && (
                  <p className={styles.content}>{applicant.comments}</p>
                )}
                {!this.state.editingMode && (
                  <Button
                    color="primary"
                    onClick={() => {
                      this.setState({ editingMode: true });
                      this.setState({ commentText: applicant.comments });
                    }}
                  >
                    Edit Comments
                  </Button>
                )}
                {this.state.editingMode && (
                  <InputContainer>
                    <Input
                      type="textarea"
                      value={this.state.commentText}
                      onChange={e => this.setState({ commentText: e.target.value })}
                    />
                    <Button
                      onClick={() => {
                        this.setState({ editingMode: false });
                        this.props.onChangeComment(this.state.commentText);
                      }}
                    >
                      Edit Comments
                    </Button>
                  </InputContainer>
                )}
              </SubSection>
            </Section>
          </Container>
        )}
      </div>
    );
  }
}

export default ApplicantInfo;

ApplicantInfo.propTypes = {
  applicant: PropTypes.object.isRequired,
  onUpdateApplicantStatus: PropTypes.func.isRequired
};
