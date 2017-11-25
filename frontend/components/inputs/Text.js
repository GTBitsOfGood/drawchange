import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class InputText extends Component {

  render() {
    return (
      <FormGroup >
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl {...this.props} />
      </FormGroup>
    );
  }
}

InputText.propTypes = {
  label: PropTypes.string,
};


export default InputText;
