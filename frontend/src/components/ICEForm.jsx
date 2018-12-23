import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import FormField from './FormField';
import styles from '../styles/Form.module.css';

const ICESchema = Yup.object().shape({
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
  address: Yup.string().required('Required'),
  
});

class ICEForm extends Component {
  constructor(props) {
    super(props);
    this.initValues = {
      name: '',
      phone_number: '',
      email: '',
      relationship: '',
      address: ''
    };
  }

  render() {
    return (
      <div>
        <h1>Emergency Contact</h1>
        <Formik
          initialValues={this.initValues}
          validationSchema={ICESchema}
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
              <FormField label="Full Name" name="name" placeholder="Jane Smith" />
              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="jane.smith@gmail.com"
              />
              <FormField
                label="Phone Number"
                type="tel"
                name="phone_number"
                placeholder="(000)000-0000"
              />
              <FormField label="Relation to Emergency Contact" name="relationship" placeholder="Mother" />
              <FormField label="Emergency Contact Address" name="address" placeholder="123 Maple St. Atlanta, GA 30308" />
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

export default ICEForm;
