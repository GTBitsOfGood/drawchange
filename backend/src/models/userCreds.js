const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.ObjectId;

// define schema for user collection (user model)
const userCredsSchema = mongoose.Schema(
  {
    googleId: { type: String, required: true, index: true, unique: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String },
    userDataId: { type: ObjectId }
  },
  { timestamps: true }
);

// export user model to app
module.exports = mongoose.model('UserCreds', userCredsSchema);
