import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OptionsSelected, Tag, Icon } from '../Shared';
import { getStatusColor, statuses, roles } from './applicantInfoHelpers';
import DropdownSelect from './DropdownSelect';
import { updateApplicantStatus, updateApplicantRole } from './queries';
import styled, { withTheme } from 'styled-components';
import { RequestContext } from '../Shared/RequestResult';
import { Button, Input } from 'reactstrap';
import { UserContext } from '../UserContext';
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
    text-align: left;
  }

  a {
    color: ${props => props.theme.grey1};
  }
`;

const SubSection = styled.div`
  flex: 1;
  display: inline-block;
  margin-right: 1rem;
  min-width: ${props => props.minWidth || '15rem'};
`;

const Container = styled.div`
  background: white;
  margin-bottom: 2rem;
  border-radius: 0.4rem;
  padding: 2rem;
  width: 100%;
`;

const InputContainer = styled.div`
  margin-top: 1.5rem;
`;

class ApplicantInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingMode: false,
      commentText: ''
    };
  }

  updateStatus = (callback, status) => {
    const { email } = this.props.applicant.bio;
    this.context.startLoading();
    setTimeout(() => {
      updateApplicantStatus(email, status).then(() => {
        this.context.success('Updated status!');
        callback(email, status);
      });
    }, 1000);
  };

  updateRole = (callback, role) => {
    const { email } = this.props.applicant.bio;
    this.context.startLoading();
    setTimeout(() => {
      updateApplicantRole(email, role).then(() => {
        this.context.success('Updated role!');
        callback(email, role);
      });
    }, 1000);
  };

  render() {
    const { applicant, updateStatusCallback, updateRoleCallback, theme } = this.props;
    return (
      <div>
        {applicant && (
          <UserContext.Consumer>
            {({ userRole }) => (
              <Container>
                <Section>
                  <Heading>
                    <h1>{`${applicant.bio.first_name} ${applicant.bio.last_name}`}</h1>
                    {userRole === 'admin' && (
                      <DropdownSelect
                        updateCallback={selected =>
                          this.updateStatus(updateStatusCallback, selected)
                        }
                        options={statuses}
                        screenEdgeAlign={true}
                      >
                        <Tag
                          type={getStatusColor(applicant.status) || ''}
                          text={statuses[applicant.status]}
                        >
                          <Icon
                            name="dropdown-arrow"
                            color={theme[getStatusColor(applicant.status)].text}
                            size="1.5rem"
                          />
                        </Tag>
                      </DropdownSelect>
                    )}
                  </Heading>
                  <SubSection>
                    <h5>Role</h5>
                    {userRole === 'admin' ? (
                      <DropdownSelect
                        updateCallback={selected => this.updateRole(updateRoleCallback, selected)}
                        options={roles}
                      >
                        <p>
                          {roles[applicant.role]}{' '}
                          <Icon name="dropdown-arrow" color={theme.grey1} size="1.5rem" />
                        </p>
                      </DropdownSelect>
                    ) : (
                      <p>{applicant.role}</p>
                    )}
                  </SubSection>
                  <SubSection>
                    <h5>Email</h5>
                    <a href={'mailto:' + applicant.bio.email}>{applicant.bio.email}</a>
                  </SubSection>
                  <SubSection>
                    <h5>Phone Number</h5>
                    <p>{applicant.bio.phone_number}</p>
                  </SubSection>
                  <SubSection>
                    <h5>Birth date</h5>
                    <p>January 1, 1980</p>
                  </SubSection>
                  <SubSection>
                    <h5>Address</h5>
                    <p>
                      {`${applicant.bio.street_address} ${applicant.bio.city}, ${
                        applicant.bio.state
                      } ${applicant.bio.zip_code}`}
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
                {userRole === 'admin' && applicant.criminal && !applicant.criminal.none && (
                  <Section>
                    <h4>Criminal Record</h4>
                    <OptionsSelected
                      options={Object.keys(applicant.criminal).filter(key => key !== 'explanation')}
                      selected={Object.keys(applicant.criminal).filter(
                        key => key !== 'explanation' && applicant.criminal[key]
                      )}
                    />
                    <h5>Explanation</h5>
                    <p>{applicant.criminal.explanation}</p>
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
                    {!this.state.editingMode && applicant.comments && <p>{applicant.comments}</p>}
                    {!this.state.editingMode && (
                      <Button
                        color="primary"
                        onClick={() => {
                          this.setState({ editingMode: true });
                          this.setState({ commentText: applicant.comments });
                        }}
                      >
                        {applicant.comments ? 'Edit Comments' : 'Add Comments'}
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
                          Save changes
                        </Button>
                      </InputContainer>
                    )}
                  </SubSection>
                </Section>
              </Container>
            )}
          </UserContext.Consumer>
        )}
      </div>
    );
  }
}

export default withTheme(ApplicantInfo);

ApplicantInfo.propTypes = {
  applicant: PropTypes.object.isRequired,
  updateStatusCallback: PropTypes.func.isRequired,
  updateRoleCallback: PropTypes.func.isRequired
};

ApplicantInfo.contextType = RequestContext;
