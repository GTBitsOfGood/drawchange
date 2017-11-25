import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Control, Form, actions, Fieldset } from 'react-redux-form';
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
// Local Components
import { register } from '../../actions/auth';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';

import InputText from '../../components/InputText';
import InputTextArea from '../../components/InputTextArea';
import InputCheck from '../../components/InputCheck';
import InputRadio from '../../components/InputRadio';
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
      <Col md={6} mdOffset={3}>
        <Form model="myForms.user">
          <h2>Personal Information</h2>
          <Fieldset model=".bio">
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
          </Fieldset>
          <h2>Tell Us About You</h2>
          <p><b>When are you available to volunteer?</b></p>
          <Fieldset model=".availability">
            <Control.checkbox component={InputCheck} model=".weekday_mornings" label="Weekday Mornings"/>
            <Control.checkbox component={InputCheck} model=".weekday_afternoons" label="Weekday Afternoons" />
            <Control.checkbox component={InputCheck} model=".weekday_evenings" label="Weekday Evenings" />
            <Control.checkbox component={InputCheck} model=".weekend_mornings" label="Weekend Mornings" />
            <Control.checkbox component={InputCheck} model=".weekend_afternoons" label="Weekend Afternoons" />
            <Control.checkbox component={InputCheck} model=".weekend_evenings" label="Weekend Evenings" />
          </Fieldset>
          <p><b>In what areas do you have skills or interests that you would enjoy using to support drawchange? </b></p>
          <Fieldset model=".skills_interests">
            <Control.checkbox component={InputCheck} model=".admin_in_office" label="Administrative In Office Support"/>
            <Control.checkbox component={InputCheck} model=".admin_virtual" label="Administrative Virtual Support" />
            <Control.checkbox component={InputCheck} model=".atlanta_shelter" label="Atlanta Homeless Shelter Program" />
            <Control.checkbox component={InputCheck} model=".orlando_shelter" label="Orlando Homeless Shelter Program" />
            <Control.checkbox component={InputCheck} model=".graphic_web_design" label="Graph/Web Design" />
            <Control.checkbox component={InputCheck} model=".special_events" label="Special Events (planning & execution)" />
            <Control.checkbox component={InputCheck} model=".grant_writing" label="Grant Writing" />
            <Control.checkbox component={InputCheck} model=".writing_editing" label="General Writing & Editing" />
            <Control.checkbox component={InputCheck} model=".social_media" label="Social Media Assistance" />
            <Control.checkbox component={InputCheck} model=".fundraising" label="Fundraising (coordination & execution)" />
            <Control.checkbox component={InputCheck} model=".finance" label="Financing Assistance (Quickbooks)" />
            <Control.checkbox component={InputCheck} model=".office_maintenance_housekeeping" label="Office Maintenance & Housekeeping" />
            <Control.checkbox component={InputCheck} model=".international_projects" label="International Projects/Trips (planning & cordinating)" />
            <Control.checkbox component={InputCheck} model=".volunteer_coordination" label="Volunteer Coordination" />
            <Control.checkbox component={InputCheck} model=".outreach" label="Outreach - Sharing with others. Start today on social media!" />
          </Fieldset>

          <p><b>How did you hear about drawchange?</b></p>
          <Fieldset model=".referral">
            <Control.checkbox component={InputCheck} model=".friend" label="Friend" />
            <Control.checkbox component={InputCheck} model=".newsletter" label="Newsletter" />
            <Control.checkbox component={InputCheck} model=".event" label="Event" />
            <Control.checkbox component={InputCheck} model=".volunteer_match" label="VolunteerMatch.org" />
            <Control.checkbox component={InputCheck} model=".internet" label="Internet Search" />
            <Control.checkbox component={InputCheck} model=".social_media" label="Social Media" />
          </Fieldset>

          <Control required component={InputText} model=".bio.languages" label="Please list any languages you speak, read, or write fluently (other than English.)" type="text" />
          <Fieldset model=".history">
            <Control required component={InputTextArea} model=".volunteer_interest_cause" label="Why are you interested in volunteering with drawchange?" />
            <Control required component={InputTextArea} model=".volunteer_support" label="What would you need FROM us to support your timely completion of tasks? What supports your productivity? What sorts of recognition do you most value?" />
            <Control required component={InputTextArea} model=".volunteer_commitment" label="What do you do when you realize you cannot keep a commitment? " />
            <Control required component={InputTextArea} model=".skills_qualifications" label="Please summarize special skills and qualifications you have acquired from employment, previous volunteer  work, or through other activities, including hobbies or sports." />
            <Control required component={InputTextArea} model=".previous_volunteer_experience" label="What are your previous volunteer experiences? Please list the organization name, city and state, position and duties. How long you were there?" />
          </Fieldset>

          <h2>Employment History</h2>
          <Fieldset model=".employment">
            <Control required component={InputText} type="text" model=".name" label="Current employer's name" />
            <Control required component={InputText} type="text" model=".position" label="Position at current employer" />
            <Control required component={InputText} type="text" model=".duration" label="How long have you been with this current employer?" />
            <Control required component={InputText} type="text" model=".location" label="Current employer's city and state" />
            <Control required component={InputText} type="text" model=".previous_name" label="Previous employer's name" />
            <Control required component={InputText} type="text" model=".previous_location" label="Previous employer's city and state" />
            <Control required component={InputText} type="text" model=".previous_reason_for_leaving" label="Why did you leave this employer?" />
          </Fieldset>
          <h2>Reference</h2>
          <Fieldset model=".reference">
            <Control required component={InputText} type="text" model=".name" label="Reference Name" />
            <Control required component={InputText} type="tel" model=".phone_number" label="Reference Phone Number" />
            <Control required component={InputText} type="email" model=".email" label="Reference Email" />
            <Control required component={InputText} type="text" model=".relationship" label="How does this person know you?" />
            <Control required component={InputText} type="text" model=".duration" label="How long have you know this person?" />
          </Fieldset>
          <h2>Criminal History</h2>
          <Fieldset model=".criminal">
            <p><b>Please indicate if you have been convicted of any of the following.</b></p>
            <Control.checkbox component={InputCheck} model=".felony" label="A felony" />
            <Control.checkbox component={InputCheck} model=".sexual_violent" label="Any crime involving a sexual offense, an assault or the use of a weapon? " />
            <Control.checkbox component={InputCheck} model=".drugs" label="Any crime involving the use, possession, or the furnishing of drugs or hypodermic syringes?" />
            <Control.checkbox component={InputCheck} model=".driving" label="Reckless driving, operating a motor vehicle while under the influence, or driving to endanger? " />
            <Control required component={InputText} type="text" model=".explanation" label="If you indicated yes to any of the above please explain and list when the offense occured." />
          </Fieldset>
          <h2>Emergency Contact</h2>
          <Fieldset model=".ice">
            <Control required component={InputText} type="text" model=".name" label="Emergency Contact Name" />
            <Control required component={InputText} type="tel" model=".phone_number" label="Emergency Contact Phone Number" />
            <Control required component={InputText} type="email" model=".email" label="Emergency Contact Email" />
            <Control required component={InputText} type="text" model=".relationship" label="Relation to Emergency Contact" />
            <Control required component={InputText} type="text" model=".address" label="Emergency Contact Address" />
          </Fieldset>
          <Fieldset model=".permissions">
          <h2>Additional Comments</h2>
            <Control required component={InputText} type="text" model=".comments" label="Is there anything else we should know about you? Any Questions, Comments, or Concerns?" />

          <h2>Permissions</h2>
          <p><b>drawchange has my permission to:</b></p>

            <Control.checkbox component={InputCheck} model=".references" label="Verify the reference I have provided" />
            <Control.checkbox component={InputCheck} model=".personal_image" label="Include my name and/or picture in drawchange promotional materials, newspapers, TV, radio, brochures, videos, website(s), etc" />
            <Control.checkbox component={InputCheck} model=".email_list" label="Add me to their mailing list. (We only send 1 email per month and never share your email address)" />
            <p>By submitting this application, I affirm that the facts set forth in it are true and complete. I understand that if I am accepted as a volunteer, any false statements, omissions, or other misrepresentations made by me on this application may result in my immediate dismissal.</p>
            <Control required component={InputText} type="text" model=".signature" label="Please enter your full legal name here, to confirm agreement." />

          </Fieldset>

          <Button bsStyle="primary">Submit Volunteer Application</Button>
          <ReduxSweetAlert />
        </Form>
      </Col>
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