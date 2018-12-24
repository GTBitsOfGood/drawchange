// npm imports
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Local imports
const UserCreds = require('./models/userCreds');

function initAuth(app) {

// Middleware
  app.use(passport.initialize());
  app.use(passport.session());

// Passport Config
  passport.serializeUser((userCreds, done) => {
    return done(null, userCreds.id);
  });

  passport.deserializeUser((userCredsIdString, done) => {
    const userCredsId = mongoose.Types.ObjectId(userCredsIdString);
    UserCreds.findById(userCredsId, (err, userCreds) => {
      return done(err, userCreds);
    });
  });

// Logout Route
  app.get('auth/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    return res.status(200).json({ logout: 'success' });
  });

  // Google Auth
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      UserCreds.findOne({ googleId: profile.id })
        .then(userCreds => {
          if (userCreds) {
            // User credentials were found, first update access and refresh tokens
            userCreds.accessToken = accessToken;
            userCreds.refreshToken = refreshToken;
            return userCreds.save();
          }

          // First time login, create the UserCreds document
          const newUserCreds = new UserCreds({
            googleId: profile.id,
            accessToken: accessToken,
            refreshToken: refreshToken,
            userDataId: null  // User does not have any data in the system yet
          });
          return newUserCreds.save();
        })
        .then(savedUserCreds => {
          // Return updated user creds
          done(null, savedUserCreds);
        })
        .catch(err => {
          done(err);
        });
    }
  ));

  app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
  );

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/loginError' }),
    function(req, res) {
      // Authentication successful, redirect to correct page based on linked user data
      if (req.user.userDataId) {
        return res.redirect('/loginRedirect?userId=' + req.user.userDataId);
      } else {
        return res.redirect('/createProfile');
      }
    }
  );
}

module.exports = {
  initAuth,
  isAuthenticated: function(req, res, next) {
    return req.user ? next() : res.redirect('/login');
  }
};
