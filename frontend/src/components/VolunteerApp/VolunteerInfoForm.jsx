import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import { Form, FormField, Checkbox, Header, Subtitle, NextButton } from '../Forms';

const defaultValues = {
  volunteer_info: {
    availability: {
      weekday_mornings: false,
      weekday_afternoons: false,
      weekday_evenings: false,
      weekend_mornings: false,
      weekend_afternoons: false,
      weekend_evenings: false
    },
    skills_interests: {
      admin_office: false,
      admin_virtual: false,
      atlanta_shelter: false,
      orlando_shelter: false,
      graphic_web_design: false,
      special_events: false,
      grant_writing: false,
      writing_editing: false,
      social_media: false,
      fundraising: false,
      finance: false,
      office_maintenance_housekeeping: false,
      international_projects: false,
      volunteer_coordination: false,
      outreach: false
    },
    languages: '',
    skills_qualifications: ''
  }
};

const VolunteerInfoForm = ({ initValues, ...props }) => {
  const values = {
    volunteer_info: { ...defaultValues.volunteer_info, ...initValues.volunteer_info }
  };

  return (
    <Form initialValues={values} {...props}>
      <Header>Volunteer Information</Header>
      <Subtitle>Your Availability</Subtitle>
      <Row>
        <Col xs={6}>
          <Checkbox name="volunteer_info.availability.weekday_mornings" value="Weekday Mornings" />
          <Checkbox
            name="volunteer_info.availability.weekday_afternoons"
            value="Weekday Afternoons"
          />
          <Checkbox name="volunteer_info.availability.weekday_evenings" value="Weekday Evenings" />
        </Col>
        <Col xs={6}>
          <Checkbox name="volunteer_info.availability.weekend_mornings" value="Weekend Mornings" />
          <Checkbox
            name="volunteer_info.availability.weekend_afternoons"
            value="Weekend Afternoons"
          />
          <Checkbox name="volunteer_info.availability.weekend_evenings" value="Weekend Evenings" />
        </Col>
      </Row>
      <br />
      <Subtitle>Skills & Interests</Subtitle>
      <Row>
        <Col xs={6}>
          <Checkbox
            name="volunteer_info.skills_interests.admin_office"
            value="Administrative In Office Support"
          />
          <Checkbox
            name="volunteer_info.skills_interests.atlanta_shelter"
            value="Atlanta Homeless Shelters"
          />
          <Checkbox
            name="volunteer_info.skills_interests.graphic_web_design"
            value="Graphic/Web Design"
          />
          <Checkbox
            name="volunteer_info.skills_interests.special_events"
            value="Special Events (planning & execution)"
          />
          <Checkbox
            name="volunteer_info.skills_interests.writing_editing"
            value="General Writing & Editing"
          />
          <Checkbox
            name="volunteer_info.skills_interests.finance"
            value="Financing Assistance (Quickbooks)"
          />
          <Checkbox
            name="volunteer_info.skills_interests.outreach"
            value="Oureach - Sharing with others. Start today on social media!"
          />
        </Col>
        <Col xs={6}>
          <Checkbox
            name="volunteer_info.skills_interests.admin_virtual"
            value="Administrative Virtual Support"
          />
          <Checkbox
            name="volunteer_info.skills_interests.orlando_shelter"
            value="Orlando Homeless Shelters"
          />
          <Checkbox
            name="volunteer_info.skills_interests.social_media"
            value="Social Media Assistance"
          />
          <Checkbox
            name="volunteer_info.skills_interests.fundraising"
            value="Fundraising (coordination & execution)"
          />
          <Checkbox
            name="volunteer_info.skills_interests.volunteer_coordination"
            value="Volutneer Coordination"
          />
          <Checkbox
            name="volunteer_info.skills_interests.office_maintenance_housekeeping"
            value="Office Maintenance & Housekeeping"
          />
          <Checkbox
            name="volunteer_info.skills_interests.international_projects"
            value="International Projects/Trips (planning & coordination)"
          />
        </Col>
      </Row>
      <FormField
        name="volunteer_info.languages"
        placeholder="Spanish, French"
        label="Please list any languages you speak, read, or write fluently (other than English.)"
      />
      <FormField
        type="textarea"
        name="volunteer_info.skills_qualifications"
        label="Please summarize special skills and qualifications you have acquired from employment, previous volunteer  work, or through other activities, including hobbies or sports."
      />
      <NextButton />
    </Form>
  );
};

VolunteerInfoForm.propTypes = {
  initValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default VolunteerInfoForm;
