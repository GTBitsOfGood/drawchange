const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define schema for user collection (user model)
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'pending',
    enum: ['pending', 'admin', 'manager', 'volunteer']
  },
  street_address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip_code: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: Date,
    required: true
  },
  events: {
    type: Array, // array of event objects
    default: []
  },
  survey_responses: {
    type: Array, // array of Survey Objects
    default: []
  },
  primary_im: {
    type: String,
    default: ""
  },
  when_available: {
    type: String,
    enum: ['weekday_mornings', 'weekday_afternoons', 'weekday_evenings', 'weekend_mornings', 'weekend_afternoons', 'weekend_evenings'],
    required: true
  },
  specific_event: {
    type: String,
    required: true
  },
  skills: {
    type: String,
    enum: ['in_office_support',
      'virtual_support',
      'atl_homeless_shelter_program',
      'orlando_homeless_shelter_program',
      'graphic_web_design_support',
      'special_events_planning',
      'grant_writing',
      'general_writing_editing',
      'social_media_assistance',
      'fundraising',
      'financing_assistance',
      'office_maintenance_housekeeping',
      'international_projects_trips',
      'volunteer_coordination',
      'outreach',
      'other']
  },
  how_did_you_learn: {
    type: String,
    required: true
  },
  other_languages: {
    type: String,
    default: ""
  },
  why_interested: {
    type: String,
    required: true
  },
  support_needed: {
    type: String,
    required: true
  },
  cannot_commit: {
    type: String,
    required: true
  },
  current_employer: {
    type: String,
    required: true
  },
  current_position: {
    type: String,
    required: true
  },
  length_current_employer: {
    type: Date,
  },
  current_employer_city_state: {
    type: String,
    default: ""
  },
  previous_employer_name: {
    type: String,
    default: ""
  },
  reason_for_leaving: {
    type: String,
    default: ""
  },
  previous_employer_city_state: {
    type: String,
    default: ""
  },
  special_skills: {
    type: String,
    required: true
  },
  previous_volunteer_experience: {
    type: String,
    required: true
  },
  additional_comments: {
    type: String,
    default: ""
  },
  references: {
    type: String,
    default: ""
  },
  felony: {
    type: Boolean,
    required: true
  },
  when_felony: {
    type: Date,
  },
  sexual_offense_gun_weapon: {
    type: Boolean,
    required: true
  },
  drugs: {
    type: Boolean,
    required: true
  },
  reckless_driving: {
    type: Boolean,
    required: true
  },
  if_yes_explain: {
    type: String,
    default: ""
  },
  emergecy_contact_name: {
    type: String,
    required: true
  },
  emergency_contact_relationship: {
    type: String,
    required: true
  },
  emergency_contact_street_address: {
    type: String,
    default: ""
  },
  emergency_contact_city: {
    type: String,
    default: ""
  },
  emergency_contact_home_phone: {
    type: String,
    default: ""
  },
  emergency_contact_cell_phone: {
    type: String,
    required: true
  },
  verify_references_permission: {
    type: Boolean,
    required: true
  },
  include_pii: { // PII - personally identifiable information
    type: Boolean,
    required: true
  },
  mailing_list: {
    type: Boolean,
    required: true
  },
}, { timestamps: true });

userSchema.virtual('age').get(function() {
  const current = new Date();
  return current.getYear() - this.date_of_birth.getYear();
});

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// export user model to app
module.exports = mongoose.model('Users', userSchema);
