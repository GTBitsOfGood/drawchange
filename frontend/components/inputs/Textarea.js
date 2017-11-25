import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

const InputTextArea = (props) => (
  <FormGroup >
    <ControlLabel>{props.label}</ControlLabel>
    <FormControl componentClass="textarea" {...props} />
  </FormGroup>
);

InputTextArea.propTypes = {
  label: PropTypes.string,
};

export default InputTextArea;