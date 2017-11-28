import React from 'react';

class VolunteerProfile extends React.Component {
  constructor(props) {
      super(props);
      this.user = this.props.user;
  }

  render() {
    return(
      <div>

        <h1> Personal Information </h1>
        <p> First Name: {this.user.bio.first_name} </p>
        <p> Last Name: {this.user.bio.last_name} </p>
        <p> Email: {this.user.bio.email} </p>
        <p> Phone Number: {this.user.bio.phone_number} </p>
        <p> Date of Birth: {this.user.bio.date_of_birth} </p>
        <p> Street Address: {this.user.bio.street_address} </p>
        <p> City: {this.user.bio.city} </p>
        <p> State: {this.user.bio.state} </p>
        <p> Zip Code: {this.user.bio.zip_code} </p>
        <p> Role: {this.user.bio.role} </p>
        <p> Languages: {this.user.bio.Languages} </p>
        <br>

        <h1> About Volunteer </h1>
        <p> Availability: {this.user.availability} </p>
        <p> Skills: {this.user.skills_interests} </p>
        <p> Why are you interested in volunteering: {this.user.history.volunteer_interest_cause} </p>
        <p> How did you hear about drawchange: {this.user.referral} </p>
        <p> What would you need from us: {this.user.history.volunteer_support} </p>
        <p> What do you do when you realize you cannot keep a commitment: {this.user.history.volunteer_commitment} </p>
        <p> Summarize skills and qualifications you have obtained from previous work: {this.user.history.skills_qualifications} </p>
        <p> Previous Volunteer Experience: {this.user.history.previous_volunteer_experience} </p>
        <br>

        <h1> Employment History </h1>
        <p> Current Employer: {this.user.employment.name} </p>
        <p> Current Position: {this.user.employment.position} </p>
        <p> Current Employer Duration: {this.user.employment.duration} </p>
        <p> Current Employer Location: {this.user.employment.location} </p>
        <p> Previous Employer: {this.user.employment.previous_name} </p>
        <p> Previous Employer Location: {this.user.employment.previous_location} </p>
        <p> Reason for Leaving: {this.user.employment.previous_reason_for_leaving} </p>
        <br>

        <h1> Reference </h1>
        <p> Reference Name: {this.user.reference.name} </p>
        <p> Reference Email: {this.user.reference.email} </p>
        <p> Reference Phone Number: {this.user.reference.phone_number} </p>
        <p> Reference Relationship: {this.user.reference.relationship} </p>
        <p> How long have you known reference: {this.user.reference.duration} </p>
        <br>

        <h1> Criminal History </h1>
        <p> {this.user.criminal} </p>
        <br>

        <h1> Emergency Contact </h1>
        <p> Name: {this.user.emergency.name} </p>
        <p> Email: {this.user.emergency.email} </p>
        <p> Phone Number: {this.user.emergency.phone_number} </p>
        <p> Relationship: {this.user.emergency.relationship} </p>
        <p> Address: {this.user.emergency.address} </p>
        <br>

        <h1> Additional Comments </h1>
        <p> {this.user.permissions.comments} </p>
        <br>

        <h1> Permissions </h1>
        <p> Verify Reference: {this.permissions.reference} </p>
        <p> Use peronsal image: {this.permissions.personal_image} </p>
        <p> Add to Mailing List: {this.permissions.email_list} </p>
        <p> Signature: {this.permissions.signature} </p>
        <br>
      </div>
    );
  }

}