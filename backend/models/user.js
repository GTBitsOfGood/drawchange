const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// define schema for user collection (user model)
const userSchema = mongoose.Schema({
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
    default: 'volunteer',
    enum: ['admin', 'manager', 'volunteer']
  },
  email: {
    type: String,
    required: true
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
  }
}, { timestamps: true });

userSchema.virtual('age').get(function() {
  const current = new Date();
  return current.getYear() - this.date_of_birth.getYear();
});
// export user model to app
module.exports = mongoose.model('Users', userSchema);
