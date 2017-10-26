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
  date_of_birth_: {
    type: Date,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  events: {
    type: Array, // array of event objects
    required: true
  },
  survey_responses: {
    type: Array // array of Survey Objects
  }
}, { timestamps: true });

// export user model to app
module.exports = mongoose.model('Users', userSchema);

    // availability: {
    //     type: Array[String],
    //     required: true
    // },
    // skills: {
    //     type: [{
    //         administrativeInOfficeSupport: { type: Boolean},
    //         administrativeVirtualSupport: {type: Boolean},
    //         atlantaHomelessShelterProgram: {type: Boolean},
    //         orlandoHomelessShelterProgram: {type: Boolean},
    //         graphicWebDesignSupport: {type: Boolean},
    //         specialEvents_Planning_DayOf: {type: Boolean},
    //         grantWriting: {type: Boolean},
    //         generalWritingOrEditing: {type: Boolean},
    //         socialMediaAssistance: {type: Boolean},
    //         fundraising: {type: Boolean},
    //         financingAssistance: {type: Boolean},
    //         officeMaintenanceOrHouseKeeping: {type: Boolean},
    //         internationalProjectsOrTrips: {type: Boolean},
    //         volunteerCoordination: {type: Boolean},
    //         outreach: {type: Boolean}
    //     }],
    //     required: true
    // },
    // referralMethod: { type: [{
    //     friend: {type: Boolean},
    //     newsletter: {type: Boolean},
    //     event: {type: Boolean},
    //     volunteerMatch: {type: Boolean},
    //     internetSearch: {type: Boolean},
    //     socialMedia: {type: Boolean},
    //     other: {type: String}
    // }],
    //     required: false
    // },
    // languages: { type: [{
    //     spanish: {type: Boolean},
    //     chinese: {type: Boolean},
    //     french: {type: Boolean},
    //     other: {type: String}
    // }],
    //     required: false
    // },
    // whyInterested: {
    //     type: String,
    //     required: false
    // },
    // needsForProductivityAndRecognition: {
    //     type: String,
    //     required: false
    // },
    // cannotKeepCommitmment: {
    //     type: String,
    //     required: false
    // },


/**
    not sure if I should use bcrypt here (since we said we are using Auth0)
**/

