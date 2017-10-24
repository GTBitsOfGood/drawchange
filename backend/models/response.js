const mongoose = require('mongoose');

// define schema for Surveys collection (Survey model)
const responseSchema = mongoose.Schema({
  survey_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  answers: {
    type: Array,
    required: true
  }
}, { timestamps: true });

// export Survey model to app
module.exports = mongoose.model('Survey', responseSchema);