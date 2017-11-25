import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormGroup, Radio } from 'react-bootstrap';

class InputRadio extends Component {

  render() {
    return (
      <FormGroup>
        {this.props.options.map((item, i) => (
          <Radio {...this.props}>
            {item}
          </Radio>
        ))}
      </FormGroup>

    );
  }
}

InputRadio.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
};


export default InputRadio;
