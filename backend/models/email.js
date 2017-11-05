const mongoose = require('mongoose');

// define schema for user collection (user model)
const emailSchema = mongoose.Schema({
  from: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  recipients: {
    type: Array,
    validate: [minNumRecipients, 'You need to specify at least one recipient'],
    required: true
  },
  is_sent: {
    type: Boolean,
    default: false
  },
  sent_on: {
    type: Date,
    default: null
  },
  is_html: {
    type: Boolean,
    required: true,
  }
}, { timestamps: true });

function minNumRecipients(val) {
  return val.length > 0;
}
// export Event model to app
module.exports = mongoose.model('Email', emailSchema);