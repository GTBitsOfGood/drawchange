import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Checkbox } from 'react-bootstrap';

class InputCheck extends Component {

  render() {
    return (
      <Checkbox {...this.props}>
        {this.props.label}
      </Checkbox>
    );
  }
}

InputCheck.propTypes = {
  label: PropTypes.string
};


export default InputCheck;
