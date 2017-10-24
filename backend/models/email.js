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
      type: Array[ mongoose.Schema.Types.ObjectId ],
      required: true
    },
    is_sent: {
      type: Boolean,
      required: true,
      default: false
    },
    deliver_on: {
      type: Date,
      required: true
    },
    isHTML: {
      type: Boolean,
      required: true,
    },
}, { timestamps: true });

// export Event model to app
module.exports = mongoose.model('Event', eventSchema);