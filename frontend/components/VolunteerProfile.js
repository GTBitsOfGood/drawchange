import React from 'react';
import PropTypes from 'prop-types';

const VolunteerProfile = ({ user }) => (
  <div style={{height: '500px', overflow: 'scroll'}}>

    <h3> Personal Information </h3>
    <p> Current Status: {user.bio.role} </p>
    <p> Name: {`${user.bio.first_name} ${user.bio.last_name}`} </p>
    <p> Email: {user.bio.email} </p>
    <p> Phone Number: {user.bio.phone_number} </p>
    <p> Date of Birth: {new Date(user.bio.date_of_birth).toDateString()} </p>
    <p> Street Address: {user.bio.street_address} </p>
    <p> City: {user.bio.city} </p>
    <p> State: {user.bio.state} </p>
    <p> Zip Code: {user.bio.zip_code} </p>
    <p> Languages: {user.bio.languages} </p>
    <br />

    <h3> About Volunteer </h3>
    {/* <p> Availability: {user.availability} </p>
    <p> Skills: {user.skills_interests} </p> */}
    <p> Why are you interested in volunteering: {user.history.volunteer_interest_cause} </p>
    {/* <p> How did you hear about drawchange: {user.referral} </p> */}
    <p> What would you need from us: {user.history.volunteer_support} </p>
    <p> What do you do when you realize you cannot keep a commitment: {user.history.volunteer_commitment} </p>
    <p> Summarize skills and qualifications you have obtained from previous work: {user.history.skills_qualifications} </p>
    <p> Previous Volunteer Experience: {user.history.previous_volunteer_experience} </p>
    <br />

    <h3> Employment History </h3>
    <p> Current Employer: {user.employment.name} </p>
    <p> Current Position: {user.employment.position} </p>
    <p> Current Employer Duration: {user.employment.duration} </p>
    <p> Current Employer Location: {user.employment.location} </p>
    <p> Previous Employer: {user.employment.previous_name} </p>
    <p> Previous Employer Location: {user.employment.previous_location} </p>
    <p> Reason for Leaving: {user.employment.previous_reason_for_leaving} </p>
    <br />

    <h3> Reference </h3>
    <p> Reference Name: {user.reference.name} </p>
    <p> Reference Email: {user.reference.email} </p>
    <p> Reference Phone Number: {user.reference.phone_number} </p>
    <p> Reference Relationship: {user.reference.relationship} </p>
    <p> How long have you known reference: {user.reference.duration} </p>
    <br />

    {/* <h3> Criminal History </h3>
    <p> {user.criminal} </p>
    <br /> */}

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
  </div>
);

VolunteerProfile.propTypes = {
  user: PropTypes.object
};

export default VolunteerProfile;

