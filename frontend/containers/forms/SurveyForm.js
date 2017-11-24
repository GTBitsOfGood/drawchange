import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Control, Form, actions } from 'react-redux-form';
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/lib/Button';
// Local Components
import { register } from '../../actions/auth';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';

import InputText from '../../components/InputText';
import InputCheck from '../../components/InputCheck';
class SurveyForm extends Component {

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
      <Form model="myForms.user" onSubmit={this.props.register} >
        <h2>Personal Information</h2>
        <Control required component={InputText} model=".first_name" label="First Name" type="text"  />
        <Control required component={InputText} model=".last_name" label="Last Name" type="text"  />
        <Control required component={InputText} model=".email" label="Email" type="email"  />
        <Control required component={InputText} model=".password" label="Password" type="password"  />
        <Control required component={InputText} model=".phone_number" label="Phone Number" type="tel"  />
        <Control required component={InputText} model=".date_of_birth" label="Date of Birth" type="date"  />
        <Control required component={InputText} model=".street_address" label="Street Address" type="text"  />
        <Control required component={InputText} model=".city" label="City" type="text"  />
        <Control required component={InputText} model=".state" label="State" type="text"  />
        <Control required component={InputText} model=".zip_code" label="Zip Code" type="text"  />

        <h2>Volunteer Preferences</h2>
        <p>When are you available to volunteer?</p>
        <Control.checkbox component={InputCheck} model=".volunteer_availability.weekday_mornings" label="Weekday Mornings"/>
        <Control.checkbox component={InputCheck} model=".volunteer_availability.weekday_afternoons" label="Weekday Afternoons" />
        <Control.checkbox component={InputCheck} model=".volunteer_availability.weekday_evenings" label="Weekday Evenings" />
        <Control.checkbox component={InputCheck} model=".volunteer_availability.weekend_mornings" label="Weekend Mornings" />
        <Control.checkbox component={InputCheck} model=".volunteer_availability.weekend_afternoons" label="Weekend Afternoons" />
        <Control.checkbox component={InputCheck} model=".volunteer_availability.weekend_evenings" label="Weekend Evenings" />

        <p>In what areas do you have skills or interests that you would enjoy using to support drawchange? </p>
        <Control.checkbox component={InputCheck} model=".skills_interests.admin_in_office" label="Administrative In Office Support"/>
        <Control.checkbox component={InputCheck} model=".skills_interests.admin_virtual" label="Administrative Virtual Support" />
        <Control.checkbox component={InputCheck} model=".skills_interests.atlanta_shelter" label="Atlanta Homeless Shelter Program" />
        <Control.checkbox component={InputCheck} model=".skills_interests.orlando_shelter" label="Orlando Homeless Shelter Program" />
        <Control.checkbox component={InputCheck} model=".skills_interests.graphic_web_design" label="Graph/Web Design" />
        <Control.checkbox component={InputCheck} model=".skills_interests.special_events" label="Special Events (planning & execution)" />
        <Control.checkbox component={InputCheck} model=".skills_interests.grant_writing" label="Grant Writing" />
        <Control.checkbox component={InputCheck} model=".skills_interests.writing_editing" label="General Writing & Editing" />
        <Control.checkbox component={InputCheck} model=".skills_interests.social_media" label="Social Media Assistance" />
        <Control.checkbox component={InputCheck} model=".skills_interests.fundraising" label="Fundraising (coordination & execution)" />
        <Control.checkbox component={InputCheck} model=".skills_interests.finance" label="Financing Assistance (Quickbooks)" />
        <Control.checkbox component={InputCheck} model=".skills_interests.office_maintenance_housekeeping" label="Office Maintenance & Housekeeping" />
        <Control.checkbox component={InputCheck} model=".skills_interests.international_projects" label="International Projects/Trips (planning & cordinating)" />
        <Control.checkbox component={InputCheck} model=".skills_interests.volunteer_coordination" label="Volunteer Coordination" />
        <Control.checkbox component={InputCheck} model=".skills_interests.outreach" label="Outreach - Sharing with others. Start today on social media!" />

        <Button bsStyle="primary">Submit Volunteer Application</Button>
        <ReduxSweetAlert />
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.registrationFailed,
    success: state.auth.registrationSuccess,
    availablility: state.myForms.user.volunteer_availability
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

export default connect(mapStateToProps, mapDispatchToProps)(SurveyForm);