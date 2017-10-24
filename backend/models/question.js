const mongoose = require('mongoose');

// define schema for questions collection (question model)
const questionSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    input: {
        type: String,
        enum: [ 'text', 'radio', 'checkbox', 'select' ],
        required: true
    },
    required: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

// export Question model to app
module.exports = mongoose.model('Question', questionSchema);