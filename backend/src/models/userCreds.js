const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const UserData = require('./userData');

// define schema for user collection (user model)
const userCredsSchema = mongoose.Schema(
  {
    googleId: { type: String, required: true, index: true, unique: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String },
    userDataId: { type: ObjectId }
  },
  {
    timestamps: true
    // toJSON: {
    //   getters: true,
    //   virtuals: true
    // }
  }
);

userCredsSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
  const that = this;
  return this.findOne(
    {
      googleId: profile.id
    },
    (err, user) => {
      // no user was found, lets create a new one
      if (!user) {
        const { email, given_name, family_name } = profile._json;
        const newUserData = new UserData({
          role: 'new',
          bio: { email, first_name: given_name, last_name: family_name }
        });

        newUserData.save((err1, savedUserData) => {
          const newUser = new that({
            googleId: profile.id,
            accessToken,
            refreshToken,
            userDataId: savedUserData.id
          });
          newUser.save((error, savedUser) => {
            if (error) console.log(error);
            return cb(error, savedUser);
          });
        });
      } else {
        // user found.
        return cb(err, user);
      }
    }
  );
};

// export user model to app
module.exports = mongoose.model('UserCreds', userCredsSchema);
