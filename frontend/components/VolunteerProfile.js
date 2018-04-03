import React from 'react';
import PropTypes from 'prop-types';
import PhoneNumber from 'react-phone-number';

const VolunteerProfile = ({ user, onClickApprove, onClickDeny }) => (
  <div style={{height: '500px', overflow: 'scroll', backgroundColor: ((user.criminal.felony || user.criminal.sexual_violent || user.criminal.drugs || user.criminal.driving)) ? 'rgba(255, 0, 0, 0.2)' : 'white'}}>

    <h3> Personal Information </h3>
    <p> Current Status: {user.bio.role} </p>
    <p> Name: {`${user.bio.first_name} ${user.bio.last_name}`} </p>
    <p> Email: <a href={"mailto:" + user.bio.email}>{user.bio.email}</a> </p>
    <p> Phone Number: <a href={"tel:" + user.bio.phone_number}> {user.bio.phone_number}</a> </p>
    <p> Date of Birth: {new Date(user.bio.date_of_birth).toDateString()} </p>
    <p> Street Address: {user.bio.street_address} </p>
    <p> City: {user.bio.city} </p>
    <p> State: {user.bio.state} </p>
    <p> Zip Code: {user.bio.zip_code} </p>
    <p> Languages: {user.bio.languages} </p>
    <br />

    <h3> About Volunteer </h3>
    {/*<p> Availability: {user.availability} </p>
    <p> Skills: {user.skills_interests} </p>*/}
    <p> Why are you interested in volunteering: {user.history.volunteer_interest_cause} </p>
    {/* <p> How did you hear about drawchange: {user.referral} </p> */}
    <p> What would you need from us: {user.history.volunteer_support} </p>
    <p> What do you do when you realize you cannot keep a commitment: {user.history.volunteer_commitment} </p>
    <p> Summarize skills and qualifications you have obtained from previous work: {user.history.skills_qualifications} </p>
    <p> Previous Volunteer Experience: {user.history.previous_volunteer_experience} </p>
    <br />

    <h3> Availability </h3>
    <ul>
    {user.availability.weekday_mornings && <li> Weekday Morning </li>}
    {user.availability.weekday_afternoons && <li> Weekday Afternoon </li>}
    {user.availability.weekday_evenings && <li> Weekday Evenings </li>}
    {user.availability.weekend_mornings && <li> Weekend Morning </li>}
    {user.availability.weekend_afternoons && <li> Weekend Afternoon </li>}
    {user.availability.weekend_evenings && <li> Weekend Evenings </li>}
    </ul>

    <h3> Employment History </h3>
    <p> Current Employer: {user.employment.name} </p>
    <ul>
    <li> Position: {user.employment.position} </li>
    <li> Duration: {user.employment.duration} </li>
    <li> Location: {user.employment.location} </li>
    </ul>
    <p> Previous Employer: {user.employment.previous_name} </p>
    <ul>
    <li> Location: {user.employment.previous_location} </li>
    <li> Reason for Leaving: {user.employment.previous_reason_for_leaving} </li>
    </ul>
    <br />

    <h3> Reference </h3>
    <p> Name: {user.reference.name} </p>
    <p> Email: {user.reference.email} </p>
    <p> Phone Number: {user.reference.phone_number} </p>
    <p> Relationship: {user.reference.relationship} </p>
    <p> How long have you known reference: {user.reference.duration} </p>
    <br />

    <h3> Criminal History </h3>
    { user.criminal.felony && <p> Felony: Yes</p>}
    { user.criminal.sexual_violent && <p> Sexual Violence: Yes</p>}
    { user.criminal.drugs && <p> Drugs: Yes</p>}
    { user.criminal.driving && <p> Driving: Yes</p>}
    { (user.criminal.felony || user.criminal.drugs || user.criminal.sexual_violent || user.criminal.driving) ?
        <p> Explanation: user.criminal.explanation </p> : <p> No criminal history. </p>}


    <h3> Emergency Contact </h3>
    <p> Relationship: {user.ice.relationship} </p>
    <p> Name: {user.ice.name} </p>
    <p> Email: {user.ice.email} </p>
    <p> Phone Number: {user.ice.phone_number} </p>
    <p> Address: {user.ice.address} </p>
    <br />

    <h3> Additional Comments </h3>
    <p> {user.permissions.comments} </p>
    <br />

    <h3> Permissions </h3>
    <p> Verify Reference: {user.permissions.reference ? 'Granted' : 'Denied'} </p>
    <p> Use peronsal image: {user.permissions.personal_image ? 'Granted' : 'Denied'} </p>
    <p> Add to Mailing List: {user.permissions.email_list ? 'Granted' : 'Denied'} </p>
    <p> Signature: {user.permissions.signature} </p>
    <br />

    {user.bio.role === 'pending' && <button type="button" onClick={()=>onClickApprove()}> Approve </button>}
    {user.bio.role === 'volunteer' && <button type="button" onClick={()=>onClickDeny()}> Deny </button>}
    {user.bio.role === 'pending' && <button type="button" onClick={()=>onClickDeny()}> Deny </button>}
  </div>
);

VolunteerProfile.propTypes = {
  user: PropTypes.object,
  onClickApprove: PropTypes.func,
  onClickDeny: PropTypes.func,
};

export default VolunteerProfile;
