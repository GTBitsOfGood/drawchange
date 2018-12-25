import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import { Form, FormField, Checkbox, NextButton, BackButton, Header, Subtitle } from '../Forms';

const validation = Yup.object().shape({
  short_answer: Yup.object().shape({
    voluteer_interest_cause: Yup.string()
      .min(80, 'Please elaborate')
      .required('Required'),
    volunteer_support: Yup.string()
      .min(80, 'Please elaborate')
      .required('Required'),
    volunteer_commitment: Yup.string()
      .min(80, 'Please elaborate')
      .required('Required'),
    previous_volunteer_experience: Yup.string()
      .min(80, 'Please elaborate')
      .required('Required')
  })
});

const defaultValues = {
  short_answer: {
    voluteer_interest_cause: '',
    volunteer_support: '',
    volunteer_commitment: '',
    previous_volunteer_experience: '',
    referral: {
      friend: false,
      newsletter: false,
      event: false,
      volunteer_match: false,
      internet: false,
      social_media: false
    }
  }
};

const ShortAnswerForm = ({ initValues, onBack, ...props }) => {
  const values = { short_answer: { ...defaultValues.short_answer, ...initValues.short_answer } };
  return (
    <Form initialValues={values} validationSchema={validation} {...props}>
      <Header>Volunteer Information</Header>
      <FormField
        type="textarea"
        name="short_answer.voluteer_interest_cause"
        label="Why are you interested in volunteering with drawchange?"
      />
      <FormField
        type="textarea"
        name="short_answer.volunteer_support"
        label="What would you need FROM us to support your timely completion of tasks? What supports your productivity? What sorts of recognition do you most value?"
      />
      <FormField
        type="textarea"
        name="short_answer.volunteer_commitment"
        label="What do you do when you realize you cannot keep a commitment?"
      />
      <FormField
        type="textarea"
        name="short_answer.previous_volunteer_experience"
        label="What are your previous volunteer experiences? Please list the organization name, city and state, position and duties. How long you were there?"
      />
      <br />
      <Subtitle>How did you hear about drawchange?</Subtitle>
      <Row>
        <Col xs={6}>
          <Checkbox name="short_answer.referral.friend" value="Friend" />
          <Checkbox name="short_answer.referral.newsletter" value="Newsletter" />
          <Checkbox name="short_answer.referral.event" value="Event" />
        </Col>
        <Col xs={6}>
          <Checkbox name="short_answer.referral.volunteer_match" value="Volunteer Match" />
          <Checkbox name="short_answer.referral.internet" value="Internet" />
          <Checkbox name="short_answer.referral.social_media" value="Social Media" />
        </Col>
      </Row>
      <div style={{ display: 'flex' }}>
        <BackButton onClick={onBack} />
        <NextButton />
      </div>
    </Form>
  );
};

ShortAnswerForm.propTypes = {
  initValues: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ShortAnswerForm;
