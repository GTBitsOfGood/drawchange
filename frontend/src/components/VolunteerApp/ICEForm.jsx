import React from 'react';
import * as Yup from 'yup';

import { Form, FormField, NextButton, Header } from '../Forms';

const validation = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  phone_number: Yup.string()
    .matches(/^((?!_).)*$/, 'Invalid phone number')
    .required('Required'),
  relationship: Yup.string().required('Required'),
  address: Yup.string().required('Required')
});

const defaultValues = {
  name: '',
  phone_number: '',
  email: '',
  relationship: '',
  address: ''
};

const defaultOnSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
};

const ICEForm = props => {
  const initValues = props.initValues || defaultValues;
  const submitHandler = props.onSubmit || defaultOnSubmit;

  return (
    <Form initialValues={initValues} validationSchema={validation} onSubmit={submitHandler}>
      <Header>Emergency Contact</Header>
      <FormField label="Full Name" name="name" placeholder="Jane Smith" />
      <FormField label="Email" name="email" type="email" placeholder="jane.smith@gmail.com" />
      <FormField label="Phone Number" type="tel" name="phone_number" placeholder="(000)000-0000" />
      <FormField label="Relation to Emergency Contact" name="relationship" placeholder="Mother" />
      <FormField
        label="Emergency Contact Address"
        name="address"
        placeholder="123 Maple St. Atlanta, GA 30308"
      />
      <NextButton />
    </Form>
  );
};

export default ICEForm;
