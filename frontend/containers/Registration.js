// NPM Packages
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';

// Local Components
import * as actions from '../actions/auth';


class Registration extends Component {
  constructor() {
    super();
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.props.swal({
        title: "Registration Failed!",
        type: "error",
        confirmButtonText: "Ok"
      });
    } else if (nextProps.success) {
      this.props.swal({
        title: "Registration Success!",
        text: "Now Please Login",
        type: "success",
        confirmButtonText: "Ok"
      });
    }
  }

  _handleInputChange(e) {
    switch(e.target.name) {
      case 'email':
        return this.props.emailChange(e.target.value);
      case 'password':
        return this.props.passwordChange(e.target.value);
      case 'phone_number':
        return this.props.phoneNumberChange(e.target.value);
      case 'first_name':
        return this.props.firstNameChange(e.target.value);
      case 'last_name':
        return this.props.lastNameChange(e.target.value);
      case 'street_address':
        return this.props.streetAddressChange(e.target.value);
      case 'city':
        return this.props.cityChange(e.target.value);
      case 'state':
        return this.props.stateChange(e.target.value);
      case 'zip_code':
        return this.props.zipCodeChange(e.target.value);
      case 'date_of_birth':
        return this.props.dateOfBirthChange(e.target.value);
      default:
        return console.log('nothing was sent to redux...', e);
    }
  }


  render() {
    return (
      <div>
        <FormGroup controlId={"email"}>
          <ControlLabel>{"Email"}</ControlLabel>
          <FormControl name={"email"} type={"text"} value={this.props.email} onChange={this._handleInputChange} />
        </FormGroup>
        <FormGroup controlId={"password"}>
          <ControlLabel>{"Password"}</ControlLabel>
          <FormControl name={"password"} type={"password"} value={this.props.password} onChange={this._handleInputChange} />
        </FormGroup>
        <FormGroup controlId={"fname"}>
          <ControlLabel>{"First Name"}</ControlLabel>
          <FormControl name={"first_name"} type={"text"} value={this.props.first_name} onChange={this._handleInputChange} />
        </FormGroup>
        <FormGroup controlId={"lname"}>
          <ControlLabel>{"Last Name"}</ControlLabel>
          <FormControl name={"last_name"} type={"text"} value={this.props.last_name} onChange={this._handleInputChange} />
        </FormGroup>
        <FormGroup controlId={"phoneNumber"}>
          <ControlLabel>{"Phone Number"}</ControlLabel>
          <FormControl name={"phone_number"} type={"tel"} value={this.props.phone_number} onChange={this._handleInputChange} />
        </FormGroup>
        <FormGroup controlId={"dob"}>
          <ControlLabel>{"Date of Birth"}</ControlLabel>
          <FormControl name={"date_of_birth"} type={"date"} value={this.props.date_of_birth} onChange={this._handleInputChange} />
        </FormGroup>
        <FormGroup controlId={"address"}>
          <ControlLabel>{"Street Address"}</ControlLabel>
          <FormControl name={"street_address"} type={"text"} value={this.props.street_address} onChange={this._handleInputChange} />
        </FormGroup>
        <FormGroup controlId={"city"}>
          <ControlLabel>{"City"}</ControlLabel>
          <FormControl name={"city"} type={"text"} value={this.props.city} onChange={this._handleInputChange} />
        </FormGroup>
        <FormGroup controlId={"state"}>
          <ControlLabel>{"State"}</ControlLabel>
          <FormControl name={"state"} type={"text"} value={this.props.state} onChange={this._handleInputChange} />
        </FormGroup>
        <FormGroup controlId={"zipcode"}>
          <ControlLabel>{"Zip Code"}</ControlLabel>
          <FormControl name={"zip_code"} type={"text"} value={this.props.zip_code} onChange={this._handleInputChange} />
        </FormGroup>
        <Button type="submit" onClick={() => this.props.register()}>
          Register
      </Button>
        <ReduxSweetAlert />
      </div>
    );
  }
}


Registration.propTypes = {
  // user fields
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  phone_number: PropTypes.string,
  date_of_birth: PropTypes.string,
  street_address: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zip_code: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,

  // update methods
  firstNameChange: PropTypes.func,
  lastNameChange: PropTypes.func,
  phoneNumberChange: PropTypes.func,
  emailChange: PropTypes.func,
  passwordChange: PropTypes.func,
  dateOfBirthChange: PropTypes.func,
  streetAddressChange: PropTypes.func,
  cityChange: PropTypes.func,
  stateChange: PropTypes.func,
  zipCodeChange: PropTypes.func,


  success: PropTypes.bool,
  register: PropTypes.func,
  error: PropTypes.bool,
  swal: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => {
  return {
    error: state.auth.registrationFailed,
    success: state.auth.registrationSuccess,

    // user fields
    first_name: state.auth.first_name,
    last_name: state.auth.last_name,
    email: state.auth.email,
    password: state.auth.password,
    date_of_birth: state.auth.date_of_birth,
    address: state.auth.address,
    city: state.auth.city,
    state: state.auth.state,
    zip_code: state.auth.zip_code,
  };
};

function mapDispatchToProps(dispatch) {
  return Object.assign(
    {},
    { swal: bindActionCreators(swal, dispatch) },
    { close: bindActionCreators(close, dispatch) },
    bindActionCreators(actions, dispatch)
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);