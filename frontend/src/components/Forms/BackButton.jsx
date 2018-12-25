import React from 'react';
import { Button } from 'reactstrap';
import styles from '../../styles/Form.module.css';

const BackButton = props => (
  <Button className={styles.button} {...props}>
    Back
  </Button>
);

export default BackButton;
