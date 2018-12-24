import React from 'react';
import * as Yup from 'yup';

import { Form, FormField, NextButton, Header, Subtitle } from '../Forms';

const validation = Yup.object().shape({
  employment: Yup.object().shape({
    name: Yup.string().required('Required'),
    position: Yup.string().required('Required'),
    duration: Yup.string().required('Required'),
    location: Yup.string().required('Required')
  }),
  previous_employment: Yup.object().shape({
    name: Yup.string(),
    location: Yup.string(),
    reason_for_leaving: Yup.string()
  })
});

const defaultValues = {
  employment: {
    name: '',
    position: '',
    duration: '',
    location: ''
  },
  previous_employment: {
    name: '',
    location: '',
    reason_for_leaving: ''
  }
};

const defaultOnSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
};

const EmploymentInfoForm = props => {
  const initValues = props.initValues || defaultValues;
  const submitHandler = props.onSubmit || defaultOnSubmit;
  return (
    <Form initialValues={initValues} validationSchema={validation} onSubmit={submitHandler}>
      <Header>Employment History</Header>
      <Subtitle>Current Employer</Subtitle>
      <FormField label="Employer" name="employment.name" placeholder="Company Name" />
      <FormField label="Position" name="employment.position" placeholder="Job Title" />
      <FormField
        label="How long have you been with this current employer?"
        name="employment.duration"
        placeholder="6 Months"
      />
      <FormField
        label="Current employer's city and state"
        name="employment.location"
        placeholder="Atlanta, GA"
      />
      <br />
      <Subtitle>Previous Employer (optional)</Subtitle>
      <FormField label="Employer" name="previous_employment.name" placeholder="Company Name" />
      <FormField
        label="Previous employer's city and state"
        name="previous_employment.location"
        placeholder="Atlanta, GA"
      />
      <FormField
        label="Why did you leave this employer?"
        name="previous_employment.reason_for_leaving"
        placeholder="Optional"
      />
      <NextButton />
    </Form>
  );
};

export default EmploymentInfoForm;
