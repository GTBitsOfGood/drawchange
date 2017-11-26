import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Control, Form, actions, Fieldset } from 'react-redux-form';
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
// Local Components
import { register } from '../../actions/auth';
import ReduxSweetAlert, { swal, close } from 'react-redux-sweetalert';

import Text from '../../components/inputs/Text';
import TextArea from '../../components/inputs/Textarea';
import Checkbox from '../../components/inputs/Checkbox';
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
      <div>
      <Col md={6} mdOffset={3}>
          <Image style={{paddingLeft: "33%"}} src={"http://drawchange.org/wp-content/uploads/2014/02/LOGO_dc.png"} />
          <p>Thank you for your interest in volunteering with us! You can volunteer to help us with a specific project, event, going to the homeless shelters with us or helping us out around the office. Whatever it is, you are guaranteed to leave with a full heart and ear to ear smile!</p>
          <p>While we greatly need and appreciate all of the volunteer assistance we receive, we do not have a full time volunteer manager on staff. Thank you in advance for understanding that your application may take a few weeks to get processed.</p>
        <Form model="myForms.user">
          <h2>Personal Information</h2>
          <Fieldset model=".bio">
            <Control required component={Text} model=".first_name" label="First Name" type="text"  />
            <Control required component={Text} model=".last_name" label="Last Name" type="text"  />
            <Control required component={Text} model=".email" label="Email" type="email"  />
            <Control required component={Text} model=".password" label="Password" type="password"  />
            <Control required component={Text} model=".phone_number" label="Phone Number" type="tel"  />
            <Control required component={Text} model=".date_of_birth" label="Date of Birth" type="date"  />
            <Control required component={Text} model=".street_address" label="Street Address" type="text"  />
            <Control required component={Text} model=".city" label="City" type="text"  />
            <Control required component={Text} model=".state" label="State" type="text"  />
            <Control required component={Text} model=".zip_code" label="Zip Code" type="text"  />
          </Fieldset>
          <h2>Tell Us About You</h2>
          <p><b>When are you available to volunteer?</b></p>
          <Fieldset model=".availability">
            <Control.checkbox component={Checkbox} model=".weekday_mornings" label="Weekday Mornings"/>
            <Control.checkbox component={Checkbox} model=".weekday_afternoons" label="Weekday Afternoons" />
            <Control.checkbox component={Checkbox} model=".weekday_evenings" label="Weekday Evenings" />
            <Control.checkbox component={Checkbox} model=".weekend_mornings" label="Weekend Mornings" />
            <Control.checkbox component={Checkbox} model=".weekend_afternoons" label="Weekend Afternoons" />
            <Control.checkbox component={Checkbox} model=".weekend_evenings" label="Weekend Evenings" />
          </Fieldset>
          <p><b>In what areas do you have skills or interests that you would enjoy using to support drawchange? </b></p>
          <Fieldset model=".skills_interests">
            <Control.checkbox component={Checkbox} model=".admin_in_office" label="Administrative In Office Support"/>
            <Control.checkbox component={Checkbox} model=".admin_virtual" label="Administrative Virtual Support" />
            <Control.checkbox component={Checkbox} model=".atlanta_shelter" label="Atlanta Homeless Shelter Program" />
            <Control.checkbox component={Checkbox} model=".orlando_shelter" label="Orlando Homeless Shelter Program" />
            <Control.checkbox component={Checkbox} model=".graphic_web_design" label="Graph/Web Design" />
            <Control.checkbox component={Checkbox} model=".special_events" label="Special Events (planning & execution)" />
            <Control.checkbox component={Checkbox} model=".grant_writing" label="Grant Writing" />
            <Control.checkbox component={Checkbox} model=".writing_editing" label="General Writing & Editing" />
            <Control.checkbox component={Checkbox} model=".social_media" label="Social Media Assistance" />
            <Control.checkbox component={Checkbox} model=".fundraising" label="Fundraising (coordination & execution)" />
            <Control.checkbox component={Checkbox} model=".finance" label="Financing Assistance (Quickbooks)" />
            <Control.checkbox component={Checkbox} model=".office_maintenance_housekeeping" label="Office Maintenance & Housekeeping" />
            <Control.checkbox component={Checkbox} model=".international_projects" label="International Projects/Trips (planning & cordinating)" />
            <Control.checkbox component={Checkbox} model=".volunteer_coordination" label="Volunteer Coordination" />
            <Control.checkbox component={Checkbox} model=".outreach" label="Outreach - Sharing with others. Start today on social media!" />
          </Fieldset>

          <p><b>How did you hear about drawchange?</b></p>
          <Fieldset model=".referral">
            <Control.checkbox component={Checkbox} model=".friend" label="Friend" />
            <Control.checkbox component={Checkbox} model=".newsletter" label="Newsletter" />
            <Control.checkbox component={Checkbox} model=".event" label="Event" />
            <Control.checkbox component={Checkbox} model=".volunteer_match" label="VolunteerMatch.org" />
            <Control.checkbox component={Checkbox} model=".internet" label="Internet Search" />
            <Control.checkbox component={Checkbox} model=".social_media" label="Social Media" />
          </Fieldset>

          <Control required component={Text} model=".bio.languages" label="Please list any languages you speak, read, or write fluently (other than English.)" type="text" />
          <Fieldset model=".history">
            <Control required component={TextArea} model=".volunteer_interest_cause" label="Why are you interested in volunteering with drawchange?" />
            <Control required component={TextArea} model=".volunteer_support" label="What would you need FROM us to support your timely completion of tasks? What supports your productivity? What sorts of recognition do you most value?" />
            <Control required component={TextArea} model=".volunteer_commitment" label="What do you do when you realize you cannot keep a commitment? " />
            <Control required component={TextArea} model=".skills_qualifications" label="Please summarize special skills and qualifications you have acquired from employment, previous volunteer  work, or through other activities, including hobbies or sports." />
            <Control required component={TextArea} model=".previous_volunteer_experience" label="What are your previous volunteer experiences? Please list the organization name, city and state, position and duties. How long you were there?" />
          </Fieldset>

          <h2>Employment History</h2>
          <Fieldset model=".employment">
            <Control required component={Text} type="text" model=".name" label="Current employer's name" />
            <Control required component={Text} type="text" model=".position" label="Position at current employer" />
            <Control required component={Text} type="text" model=".duration" label="How long have you been with this current employer?" />
            <Control required component={Text} type="text" model=".location" label="Current employer's city and state" />
            <Control required component={Text} type="text" model=".previous_name" label="Previous employer's name" />
            <Control required component={Text} type="text" model=".previous_location" label="Previous employer's city and state" />
            <Control required component={Text} type="text" model=".previous_reason_for_leaving" label="Why did you leave this employer?" />
          </Fieldset>
          <h2>Reference</h2>
          <Fieldset model=".reference">
            <Control required component={Text} type="text" model=".name" label="Reference Name" />
            <Control required component={Text} type="tel" model=".phone_number" label="Reference Phone Number" />
            <Control required component={Text} type="email" model=".email" label="Reference Email" />
            <Control required component={Text} type="text" model=".relationship" label="How does this person know you?" />
            <Control required component={Text} type="text" model=".duration" label="How long have you know this person?" />
          </Fieldset>
          <h2>Criminal History</h2>
          <Fieldset model=".criminal">
            <p><b>Please indicate if you have been convicted of any of the following.</b></p>
            <Control.checkbox component={Checkbox} model=".felony" label="A felony" />
            <Control.checkbox component={Checkbox} model=".sexual_violent" label="Any crime involving a sexual offense, an assault or the use of a weapon? " />
            <Control.checkbox component={Checkbox} model=".drugs" label="Any crime involving the use, possession, or the furnishing of drugs or hypodermic syringes?" />
            <Control.checkbox component={Checkbox} model=".driving" label="Reckless driving, operating a motor vehicle while under the influence, or driving to endanger? " />
            <Control required component={Text} type="text" model=".explanation" label="If you indicated yes to any of the above please explain and list when the offense occured." />
          </Fieldset>
          <h2>Emergency Contact</h2>
          <Fieldset model=".ice">
            <Control required component={Text} type="text" model=".name" label="Emergency Contact Name" />
            <Control required component={Text} type="tel" model=".phone_number" label="Emergency Contact Phone Number" />
            <Control required component={Text} type="email" model=".email" label="Emergency Contact Email" />
            <Control required component={Text} type="text" model=".relationship" label="Relation to Emergency Contact" />
            <Control required component={Text} type="text" model=".address" label="Emergency Contact Address" />
          </Fieldset>
          <Fieldset model=".permissions">
          <h2>Additional Comments</h2>
            <Control required component={Text} type="text" model=".comments" label="Is there anything else we should know about you? Any Questions, Comments, or Concerns?" />

          <h2>Permissions</h2>
          <p><b>drawchange has my permission to:</b></p>

            <Control.checkbox component={Checkbox} model=".reference" label="Verify the reference I have provided" />
            <Control.checkbox component={Checkbox} model=".personal_image" label="Include my name and/or picture in drawchange promotional materials, newspapers, TV, radio, brochures, videos, website(s), etc" />
            <Control.checkbox component={Checkbox} model=".email_list" label="Add me to their mailing list. (We only send 1 email per month and never share your email address)" />
            <p>By submitting this application, I affirm that the facts set forth in it are true and complete. I understand that if I am accepted as a volunteer, any false statements, omissions, or other misrepresentations made by me on this application may result in my immediate dismissal.</p>
            <Control required component={Text} type="text" model=".signature" label="Please enter your full legal name here, to confirm agreement." />

          </Fieldset>

          <Button bsStyle="primary" onClick={this.props.register}>Submit Volunteer Application</Button>
          <ReduxSweetAlert />
        </Form>
      </Col>
      </div>
    );
  }
}

SurveyForm.propTypes = {
  register: PropTypes.func,
  error: PropTypes.bool,
  success: PropTypes.bool,
  swal: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,

};

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