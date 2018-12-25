import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { Form, FormField, NextButton, BackButton, Header, Subtitle } from '../Forms';

const validation = Yup.object().shape({
  employment: Yup.object().shape({
    current: Yup.object().shape({
      name: Yup.string().required('Required'),
      position: Yup.string().required('Required'),
      duration: Yup.string().required('Required'),
      location: Yup.string().required('Required')
    }),
    previous: Yup.object().shape({
      name: Yup.string(),
      location: Yup.string(),
      reason_for_leaving: Yup.string()
    })
  })
});

const defaultValues = {
  employment: {
    current: {
      name: '',
      position: '',
      duration: '',
      location: ''
    },
    previous: {
      name: '',
      location: '',
      reason_for_leaving: ''
    }
  }
};

const EmploymentInfoForm = ({ initValues, onBack, ...props }) => {
  const values = { employment: { ...defaultValues.employment, ...initValues.employment } };
  return (
    <Form initialValues={values} validationSchema={validation} {...props}>
      <Header>Employment History</Header>
      <Subtitle>Current Employer</Subtitle>
      <FormField label="Employer" name="employment.current.name" placeholder="Company Name" />
      <FormField label="Position" name="employment.current.position" placeholder="Job Title" />
      <FormField
        label="How long have you been with this current employer?"
        name="employment.current.duration"
        placeholder="6 Months"
      />
      <FormField
        label="Current employer's city and state"
        name="employment.current.location"
        placeholder="Atlanta, GA"
      />
      <br />
      <Subtitle>Previous Employer (optional)</Subtitle>
      <FormField label="Employer" name="employment.previous.name" placeholder="Company Name" />
      <FormField
        label="Previous employer's city and state"
        name="employment.previous.location"
        placeholder="Atlanta, GA"
      />
      <FormField
        label="Why did you leave this employer?"
        name="employment.previous.reason_for_leaving"
        placeholder="Optional"
      />
      <div style={{ display: 'flex' }}>
        <BackButton onClick={onBack} />
        <NextButton />
      </div>
    </Form>
  );
};

EmploymentInfoForm.propTypes = {
  initValues: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default EmploymentInfoForm;
