import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FormGroup, Input, Label } from 'reactstrap';

import styles from '../styles/Form.module.css';

const Checkbox = props => (
  <div className={styles.flex_field}>
    <Field name={props.name}>
      {({ field, form }) => (
        <FormGroup className={styles.flex_field} check>
          <Label className={styles.label}>
            <Input
              type="checkbox"
              {...props}
              {...field}
              // {...form}
              checked={field.value}
              onChange={() => form.setFieldValue(props.name, !field.value)}
            />
            {props.value}
          </Label>
        </FormGroup>
      )}
    </Field>
    <ErrorMessage component="div" className={styles.error} name={props.name} />
  </div>
);

export default Checkbox;
