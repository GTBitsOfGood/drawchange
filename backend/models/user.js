const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//define schema for user collection (user model)
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    streetAddress: {
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
    zipCode: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    availability: {
        type: Array[String],
        required: true
    },
    skills: { type: [{
        administrativeInOfficeSupport: { type: Boolean},
        administrativeVirtualSupport: {type: Boolean},
        atlantaHomelessShelterProgram: {type: Boolean},
        orlandoHomelessShelterProgram: {type: Boolean},
        graphicWebDesignSupport: {type: Boolean},
        specialEvents_Planning_DayOf: {type: Boolean},
        grantWriting: {type: Boolean},
        generalWritingOrEditing: {type: Boolean},
        socialMediaAssistance: {type: Boolean},
        fundraising: {type: Boolean},
        financingAssistance: {type: Boolean},
        officeMaintenanceOrHouseKeeping: {type: Boolean},
        internationalProjectsOrTrips: {type: Boolean},
        volunteerCoordination: {type: Boolean},
        outreach: {type: Boolean}
        }],
    required: true
    },
    referralMethod: { type: [{
        friend: {type: Boolean},
        newsletter: {type: Boolean},
        event: {type: Boolean},
        volunteerMatch: {type: Boolean},
        internetSearch: {type: Boolean},
        socialMedia: {type: Boolean},
        other: {type: String}
        }],
    required: false
    },
    languages: { type: [{
        spanish: {type: Boolean},
        chinese: {type: Boolean},
        french: {type: Boolean},
        other: {type: String}
        }],
    required: false
    },
    whyInterested: {
        type: String,
        required: false
    },
    needsForProductivityAndRecognition: {
        type: String,
        required: false
    },
    cannotKeepCommitmment: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    events: {
        type: Array[Schema.Types.ObjectId], //array of event objects
        required: true
    }
}, { timestamps: true });

/**
    not sure if I should use bcrypt here (since we said we are using Auth0)
**/

//export user model to app
module.exports = mongoose.model('Users', userSchema);