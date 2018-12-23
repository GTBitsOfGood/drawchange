import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from "yup";

import FormField from './FormField';
import styles from '../styles/Form.module.css'

const personalInfoSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  phoneNumber: Yup.string()
  .matches(/^((?!_).)*$/, 'Invalid phone number')
  .required('Required'),
  dob: Yup.date().required('Required'),
  streetAddress: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().max(2, 'Please use 2 letter abbreviation').required('Required'),
  zipcode: Yup.string().matches(/^[0-9]{5}$/, 'Invalid zipcode').required('Required')
});

class PersonalInfoForm extends Component {
  constructor(props) {
    super(props);
    this.initValues = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dob: '',
      streetAddress: '',
      city: '',
      state: '',
      zipcode: ''
    }
  }

  render() {
    return (
      <div>
        <h1>Personal Information</h1>
        <Formik
          initialValues={this.initValues}
          validationSchema={personalInfoSchema}
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
              <FormField label="First Name" name="firstName" placeholder="Jane"/>
              <FormField label="Last Name" name="lastName" placeholder="Smith"/>
              <FormField label="Email" name="email" type="email" placeholder="jane.smith@gmail.com"/>
              <FormField label="Phone Number" type="tel" name="phoneNumber" placeholder="(000)000-0000"/>
              <FormField label="Date of Birth" type="date" name="dob" placeholder="MM/DD/YYYY"/>
              <FormField label="Street Address" name="streetAddress" placeholder="123 Maple St"/>
              <FormField label="City" name="city" placeholder="Atlanta"/>
              <FormField label="State" name="state" placeholder="GA"/>
              <FormField label="Zipcode" name="zipcode" placeholder="30313"/>
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

export default PersonalInfoForm;
