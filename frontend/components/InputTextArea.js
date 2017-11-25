import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class InputTextArea extends Component {

  render() {
    return (
      <FormGroup controlId="formBasicText" >
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl componentClass="textarea" {...this.props} />
      </FormGroup>
    );
  }
}

InputTextArea.propTypes = {
  label: PropTypes.string,
};


export default InputTextArea;
