import React from 'react';
import * as Yup from 'yup';

import { Form, FormField, NextButton, Header } from '../Forms';

const validation = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  relationship: Yup.string().required('Required'),
  duration: Yup.string().required('Required')
});

const defaultValues = {
  name: '',
  phone_number: '',
  email: '',
  relationship: '',
  duration: ''
};

const defaultOnSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
};

const ReferenceForm = props => {
  const initValues = props.initValues || defaultValues;
  const submitHandler = props.onSubmit || defaultOnSubmit;
  return (
    <Form initialValues={initValues} validationSchema={validation} onSubmit={submitHandler}>
      <Header>Reference</Header>
      <FormField label="Reference Full Name" name="name" placeholder="Jane Smith" />
      <FormField
        label="Reference Email"
        name="email"
        type="email"
        placeholder="jane.smith@gmail.com"
      />
      <FormField
        label="Reference Phone Number"
        type="tel"
        name="phone_number"
        placeholder="(000)000-0000"
      />
      <FormField
        label="How does this person know you?"
        name="relationship"
        placeholder="Previous Coworker"
      />
      <FormField
        label="How long have you known this person?"
        name="duration"
        placeholder="10 Months"
      />
      <NextButton />
    </Form>
  );
};

export default ReferenceForm;
