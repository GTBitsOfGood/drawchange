import React from 'react';
import * as Yup from 'yup';

import { Form, FormField, Checkbox, NextButton, Header, Text } from '../Forms';

const validation = Yup.object().shape({
  comments: Yup.string(),
  reference: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
  personal_image: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
  email_list: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
  signature: Yup.string().required('Required')
});

const defaultValues = {
  comments: '',
  reference: false,
  personal_image: false,
  email_list: false,
  signature: ''
};

const defaultOnSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
};

const PermissionsForm = props => {
  const initValues = props.initValues || defaultValues;
  const submitHandler = props.onSubmit || defaultOnSubmit;
  return (
    <Form initialValues={initValues} validationSchema={validation} onSubmit={submitHandler}>
      <Header>Permissions</Header>
      <FormField
        type="textarea"
        name="comments"
        label="Is there anything else we should know about you? Any questions, comments, or concerns?"
      />
      <br />
      <Text bold>drawchange has my permission to:</Text>
      <Checkbox name="reference" value="Verify the reference I have provided" />
      <Checkbox
        name="personal_image"
        value="Include my name and/or picture in drawchange promotional materials, newspapers, TV, radio, brochures, videos, website(s), etc"
      />
      <Checkbox
        name="email_list"
        value="Add me to their mailing list. (We only send 1 email per month and never share your email address) "
      />
      <br />
      <Text>
        By submitting this application, I affirm that the facts set forth in it are true and
        complete. I understand that if I am accepted as a volunteer, any false statements,
        omissions, or other misrepresentations made by me on this application may result in my
        immediate dismissal.
      </Text>
      <FormField
        name="signature"
        label="Please enter your full legal name here, to confirm agreement."
      />

      <NextButton />
    </Form>
  );
};

export default PermissionsForm;
