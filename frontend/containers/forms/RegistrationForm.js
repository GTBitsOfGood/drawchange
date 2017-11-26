import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Control, Form, actions } from 'react-redux-form';
import { bindActionCreators } from 'redux';
// Local Components
import { register } from '../../actions/auth';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';

class RegistrationForm extends Component {

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

  render() {
    return (
      <div>
        <Form
          model="myForms.user"
          onSubmit={this.props.register}
        >
          <label htmlFor=".email">Email:</label>
          <br/>
          <Control.text type="email" model=".email" id=".email" />
          <br/>

          <label htmlFor=".password">Password:</label>
          <br/>
          <Control.text type="password" model=".password" id=".password" />
          <br/>

          <label htmlFor=".first_name">First Name:</label>
          <br/>
          <Control.text model=".first_name" id=".first_name" />
          <br/>

          <label htmlFor=".last_name">Last Name:</label>
          <br/>
          <Control.text model=".last_name" id=".last_name" />
          <br/>

          <label htmlFor=".phone_number">Phone Number:</label>
          <br/>
          <Control.text type="tel" model=".phone_number" id=".phone_number" />
          <br/>

          <label htmlFor=".date_of_birth">Date of Birth:</label>
          <br/>
          <Control.text type="date" model=".date_of_birth" id=".date_of_birth" />
          <br/>

          <label htmlFor=".street_address">Address:</label>
          <br/>
          <Control.text model=".street_address" id=".street_address" />
          <br/>

          <label htmlFor=".city">City:</label>
          <br/>
          <Control.text model=".city" id=".city" />
          <br/>

          <label htmlFor=".state">State:</label>
          <br/>
          <Control.text model=".state" id=".state" />
          <br/>

          <label htmlFor=".zip_code">Zip Code:</label>
          <br/>
          <Control.text model=".zip_code" id=".zip_code" />
          <br/>

          <br/>
          <button type="submit">
            Register!
          </button>
          <ReduxSweetAlert />
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.registrationFailed,
    success: state.auth.registrationSuccess,
  };
}

function mapDispatchToProps(dispatch) {
  return Object.assign(
    {},
    { swal: bindActionCreators(swal, dispatch) },
    { close: bindActionCreators(close, dispatch) },
    { register: () => dispatch(register()) },
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);