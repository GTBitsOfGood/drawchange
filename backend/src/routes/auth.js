// npm imports
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const router = express.Router();

// Local imports
const UserCreds = require('../models/userCreds');

// Middleware
router.use(passport.initialize());
router.use(passport.session());

// Passport Config
passport.serializeUser((userCreds, done) => {
  return done(null, userCreds.id);
});

passport.deserializeUser((userCredsId, done) => {
  UserCreds.findById(userCredsId, (err, userCreds) => {
    return done(err, userCreds);
  });
});

// Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  return res.status(200).json({ logout: 'success' });
});

// Google Auth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/google/callback'
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

router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/loginError' }),
  function(req, res) {
    if (req.user && req.user.userDataId) {
      return res.redirect('/loginRedirect?userId=' + req.user.userDataId);
    } else {
      return res.redirect('/createProfile');
    }
  }
);

module.exports = {
  isAuthenticated: function(req, res, next) {
    return req.user ? next() : res.redirect('/login');
  },
  router
};
