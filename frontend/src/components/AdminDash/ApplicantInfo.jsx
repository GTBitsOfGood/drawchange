import React from 'react';
import styles from '../../styles/AppInfo.module.css';
import { Heading, OptionsSelected } from '../Shared';
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

const ApplicantInfo = ({ applicant }) => (
  <div className={styles.container}>
    {applicant && (
      <Container>
        <Section>
          <Heading>{`${applicant.bio.first_name} ${applicant.bio.last_name}`}</Heading>
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
      </Container>
    )}
  </div>
);

export default ApplicantInfo;
