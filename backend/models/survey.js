const mongoose = require('mongoose');

// define schema for skills collection (skill model)
const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    questions: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

// export Skill model to app
module.exports = mongoose.model('Skill', eventSchema);