import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import FormField from './FormField';
import Checkbox from './Checkbox'
import styles from '../styles/Form.module.css';

const EmploymentInfoSchema = Yup.object().shape({
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
  state: Yup.string()
    .max(2, 'Please use 2 letter abbreviation')
    .required('Required'),
  zipcode: Yup.string()
    .matches(/^[0-9]{5}$/, 'Invalid zipcode')
    .required('Required')
});

class EmploymentInfoForm extends Component {
  constructor(props) {
    super(props);
    this.initValues = {
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
      },
      reference: {
        name: '',
        phone_number: '',
        email: '',
        relationship: '',
        duration: ''
      },
      criminal: {
        sexual_violent: false,
        drugs: false,
        driving: false,
        explanation: ''
      }
    };
  }

  render() {
    return (
      <div>
        <h1>Employment History</h1>
        <Formik
          initialValues={this.initValues}
          // validationSchema={EmploymentInfoSchema}
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
              <h4 className={styles.subtitle} >Current Employer</h4>
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

              <h4 className={styles.subtitle} >Previous Employer (optional)</h4>
              <FormField
                label="Employer"
                name="previous_employment.name"
                placeholder="Company Name"
              />
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

              <h4 className={styles.subtitle} >Reference</h4>
              <FormField label="Reference Full Name" name="reference.name" placeholder="Jane Smith" />
              <FormField
                label="Reference Email"
                name="reference.email"
                type="email"
                placeholder="jane.smith@gmail.com"
              />
              <FormField
                label="Reference Phone Number"
                type="tel"
                name="reference.phone_number"
                placeholder="(000)000-0000"
              />
              <FormField label="How does this person know you?" name="reference.relationship" placeholder="Previous Coworker" />
              <FormField label="How long have you known this person?" name="reference.duration" placeholder="10 Months" />

              <h4 className={styles.subtitle} >Criminal History</h4>
              <p className={styles.flex_field} >
                <b>Please indicate if you have been convicted of any of the following.</b>
              </p>
              <Checkbox name="criminal.sexual_violent" value="Any crime involving a sexual offense, an assault or the use of a weapon? " />
              <Checkbox name="criminal.drugs" value="Any crime involving the use, possession, or the furnishing of drugs or hypodermic syringes?" />
              <Checkbox name="criminal.driving" value="Reckless driving, operating a motor vehicle while under the influence, or driving to endanger?" />
              <FormField name="criminal.explanation" label="If you indicated yes to any of the above please explain and list when the offense occured." />
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

export default EmploymentInfoForm;
