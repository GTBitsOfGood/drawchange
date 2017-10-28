const mongoose = require('mongoose');

// define schema for Surveys collection (Survey model)
const surveySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: {
    type: Array, // array of question objects
    required: true
  },
  responses: {
    type: Array, // array of response objects
    default: []
  }
}, { timestamps: true });

// export Survey model to app
module.exports = mongoose.model('Survey', surveySchema);