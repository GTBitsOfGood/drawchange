import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Row, Col } from 'reactstrap';

import FormField from './FormField';
import Checkbox from './Checkbox';

import styles from '../styles/Form.module.css';

const shortAnswerSchema = Yup.object().shape({
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
});

class ShortAnswerForm extends Component {
  constructor(props) {
    super(props);
    this.initValues = {
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
    };
  }

  render() {
    return (
      <div>
        <h1>Volunteer Information</h1>
        <Formik
          initialValues={this.initValues}
          validationSchema={shortAnswerSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
            /* and other goodies */
          }) => (
            <Form className={styles.form}>
              <FormField
                type="textarea"
                name="voluteer_interest_cause"
                label="Why are you interested in volunteering with drawchange?"
              />
              <FormField
                type="textarea"
                name="volunteer_support"
                label="What would you need FROM us to support your timely completion of tasks? What supports your productivity? What sorts of recognition do you most value?"
              />
              <FormField
                type="textarea"
                name="volunteer_commitment"
                label="What do you do when you realize you cannot keep a commitment?"
              />
              <FormField
                type="textarea"
                name="previous_volunteer_experience"
                label="What are your previous volunteer experiences? Please list the organization name, city and state, position and duties. How long you were there?"
              />
              <br />
              <h4 className={styles.subtitle}>How did you hear about drawchange?</h4>
              <Row>
                <Col xs={6}>
                  <Checkbox name="referral.friend" value="Friend" />
                  <Checkbox name="referral.newsletter" value="Newsletter" />
                  <Checkbox name="referral.event" value="Event" />
                </Col>
                <Col xs={6}>
                  <Checkbox name="referral.volunteer_match" value="Volunteer Match" />
                  <Checkbox name="referral.internet" value="Internet" />
                  <Checkbox name="referral.social_media" value="Social Media" />
                </Col>
              </Row>

              <button className={styles.button} type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default ShortAnswerForm;
