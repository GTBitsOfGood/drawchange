import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Checkbox from './Checkbox';
import FormField from './FormField';
import styles from '../styles/Form.module.css';

const permissionsSchema = Yup.object().shape({
  reference: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
  personal_image: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
  email_list: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
  signature: Yup.string().required('Required'),
});

class PermissionsForm extends Component {
  constructor(props) {
    super(props);
    this.initValues = {
      reference: false,
      personal_image: false,
      email_list: false,
      signature: '',
      comments: ''
    };
  }

  render() {
    return (
      <div>
        <h1>Permissions</h1>
        <Formik
          initialValues={this.initValues}
          validationSchema={permissionsSchema}
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
                name="comments"
                label="Is there anything else we should know about you? Any Questions, Comments, or Concerns?"
              />
              <p className={styles.flex_field} >
                <b>drawchange has my permission to:</b>
              </p>
              <Checkbox name="reference" value="Verify the reference I have provided" />
              <Checkbox
                name="personal_image"
                value="Include my name and/or picture in drawchange promotional materials, newspapers, TV, radio, brochures, videos, website(s), etc"
              />
              <Checkbox
                name="email_list"
                value="Add me to their mailing list. (We only send 1 email per month and never share your email address) "
              />
              <p className={styles.flex_field} >
                By submitting this application, I affirm that the facts set forth in it are true and
                complete. I understand that if I am accepted as a volunteer, any false statements,
                omissions, or other misrepresentations made by me on this application may result in
                my immediate dismissal.
              </p>
              <FormField
                name="signature"
                label="Please enter your full legal name here, to confirm agreement."
              />

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

export default PermissionsForm;
