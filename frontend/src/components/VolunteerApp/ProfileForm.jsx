import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { Form, FormField, NextButton, Header } from '../Forms';

const validation = Yup.object().shape({
  bio: Yup.object().shape({
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
  })
});

const defaultValues = {
  bio: {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    dob: new Date(),
    streetAddress: '',
    city: '',
    state: '',
    zipcode: ''
  }
};

const PersonalInfoForm = ({ initValues, ...props }) => {
  const values = { bio: { ...defaultValues.bio, ...initValues.bio } };
  return (
    <Form initialValues={values} validationSchema={validation} {...props}>
      <Header>Personal Information</Header>
      <FormField label="First Name" name="bio.first_name" placeholder="Jane" />
      <FormField label="Last Name" name="bio.last_name" placeholder="Smith" />
      <FormField label="Email" name="bio.email" type="email" placeholder="jane.smith@gmail.com" />
      <FormField
        label="Phone Number"
        type="tel"
        name="bio.phone_number"
        placeholder="(000)000-0000"
      />
      <FormField label="Date of Birth" type="date" name="bio.dob" placeholder="MM/DD/YYYY" />
      <FormField label="Street Address" name="bio.streetAddress" placeholder="123 Maple St" />
      <FormField label="City" name="bio.city" placeholder="Atlanta" />
      <FormField label="State" name="bio.state" placeholder="GA" />
      <FormField label="Zipcode" name="bio.zipcode" placeholder="30313" />
      <NextButton />
    </Form>
  );
};

PersonalInfoForm.propTypes = {
  initValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default PersonalInfoForm;
