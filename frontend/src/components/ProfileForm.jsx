import React from 'react';
import * as Yup from 'yup';

import { Form, FormField, SubmitButton, Header } from './Forms';

const validation = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  last_name: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  phone_number: Yup.string()
    .matches(/^((?!_).)*$/, 'Invalid phone number')
    .required('Required'),
  dob: Yup.date()
    .max(new Date(), `Invalid date of birth`)
    .required('Required'),
  streetAddress: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string()
    .max(2, 'Please use 2 letter abbreviation')
    .required('Required'),
  zipcode: Yup.string()
    .matches(/^[0-9]{5}$/, 'Invalid zipcode')
    .required('Required')
});

const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  dob: '',
  streetAddress: '',
  city: '',
  state: '',
  zipcode: ''
};

const defaultOnSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
};

const PersonalInfoForm = props => {
  const initValues = props.initValues || defaultValues;
  const submitHandler = props.onSubmit || defaultOnSubmit;
  return (
    <Form initialValues={initValues} validationSchema={validation} onSubmit={submitHandler}>
      <Header>Personal Information</Header>
      <FormField label="First Name" name="first_name" placeholder="Jane" />
      <FormField label="Last Name" name="last_name" placeholder="Smith" />
      <FormField label="Email" name="email" type="email" placeholder="jane.smith@gmail.com" />
      <FormField label="Phone Number" type="tel" name="phone_number" placeholder="(000)000-0000" />
      <FormField label="Date of Birth" type="date" name="dob" placeholder="MM/DD/YYYY" />
      <FormField label="Street Address" name="streetAddress" placeholder="123 Maple St" />
      <FormField label="City" name="city" placeholder="Atlanta" />
      <FormField label="State" name="state" placeholder="GA" />
      <FormField label="Zipcode" name="zipcode" placeholder="30313" />
      <SubmitButton />
    </Form>
  );
};

export default PersonalInfoForm;
