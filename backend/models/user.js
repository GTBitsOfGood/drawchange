const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// define schema for user collection (user model)
const userSchema = mongoose.Schema({
  bio: {
    first_name: { type: String, required: true },
    last_name: {type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    street_address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip_code: { type: String, required: true },
    password: { type: String, required: true },
    languages: { type: String, default: '' },
    role: { type: String, default: 'pending',
      enum: ['pending', 'admin', 'manager', 'volunteer']
    }
  },
  history: {
    volunteer_interest_cause: { type: String, required: true },
    volunteer_support: { type: String, required: true },
    volunteer_commitment: { type: String, required: true },
    skills_qualifications: { type: String, required: true },
    previous_volunteer_experience: { type: String, required: true }
  },
  availability: {
    weekday_mornings: { type: Boolean, default: false },
    weekday_afternoons: { type: Boolean, default: false },
    weekday_evenings: { type: Boolean, default: false },
    weekend_mornings: { type: Boolean, default: false },
    weekend_afternoons: { type: Boolean, default: false },
    weekend_evenings: { type: Boolean, default: false },
  },
  skills_interests: {
    admin_in_office: { type: Boolean, default: false },
    admin_virtual: { type: Boolean, default: false },
    atlanta_shelter: { type: Boolean, default: false },
    orlando_shelter: { type: Boolean, default: false },
    graphic_web_design: { type: Boolean, default: false },
    special_events: { type: Boolean, default: false },
    grant_writing: { type: Boolean, default: false },
    writing_editing: { type: Boolean, default: false },
    social_media: { type: Boolean, default: false },
    fundraising: { type: Boolean, default: false },
    finance: { type: Boolean, default: false },
    office_maintenance_housekeeping: { type: Boolean, default: false },
    international_projects: { type: Boolean, default: false },
    volunteer_coordination: { type: Boolean, default: false },
    outreach: { type: Boolean, default: false },
  },
  referral: {
    friend: { type: Boolean, default: false },
    newsletter: { type: Boolean, default: false },
    event: { type: Boolean, default: false },
    volunteer_match: { type: Boolean, default: false },
    internet: { type: Boolean, default: false },
    social_media: { type: Boolean, default: false },
  },
  employment: {
    name: { type: String, required: true },
    position: { type: String, required: true },
    duration: { type: String, required: true },
    location: { type: String, required: true },
    previous_name: { type: String, required: true },
    previous_reason_for_leaving: { type: String, required: true },
    previous_location: { type: String, required: true }
  },
  reference: {
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    relationship: { type: String, required: true },
    duration: { type: String, required: true }
  },
  criminal: {
    felony: { type: Boolean, required: true },
    sexual_violent: { type: Boolean, required: true },
    drugs: { type: Boolean, required: true },
    driving: { type: Boolean, required: true },
    explanation: { type: String }
  },
  ice: {
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    phone_number: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  permissions: {
    comments: { type: String},
    reference: { type: Boolean, required: true },
    personal_image: { type: Boolean, required: true },
    email_list: { type: Boolean, required: true },
    signature: { type: String, required: true }
  },

  events: {
    type: Array, // array of event objects
    default: []
  },
}, { timestamps: true });

userSchema.virtual('name').get(function() {
  return this.bio.first_name + this.bio.last_name;
});

userSchema.virtual('age').get(function() {
  const current = new Date();
  return current.getYear() - this.bio.date_of_birth.getYear();
});

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.bio.password);
};

// export user model to app
module.exports = mongoose.model('Users', userSchema);
