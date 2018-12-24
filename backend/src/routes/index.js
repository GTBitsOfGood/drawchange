// NPM Packages
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const router = express.Router();

// Local Imports
const UserData = require('../models/userData');
const UserCreds = require('../models/userCreds');
const events = require('./events');
const emails = require('./emails');
const users = require('./users');
const contact = require('./contact');

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
  return res.status(200).json({ logout: 'success' });
});

// Google Auth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    UserCreds.findOne({ googleId: profile.id }, function (err, userCreds) {
      if (err) {
        return done(err);
      }

      if (userCreds) {
        // User credentials were found, first update access and refresh tokens
        userCreds.accessToken = accessToken;
        userCreds.refreshToken = refreshToken;
        userCreds.save((err, savedUserCreds) => {
          if (err) {
            done(err);
          }
          // Return updated user creds
          return done(null, savedUserCreds);
        });
        return;
      }

      // Create the UserCreds document
      const newUserCreds = new UserCreds({
        googleId: profile.id,
        accessToken: accessToken,
        refreshToken: refreshToken,
        userDataId: null  // User does not have any data in the system yet
      });
      newUserCreds.save((err, savedUserCreds) => {
        if (err) {
          done(err);
        }

        // Return new user creds
        return done(null, savedUserCreds);
      });

    });
  }
));

router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login/error'}), function(req, res) {
  if (req.user && req.user.userDataId) {
    return res.redirect('/loginRedirect?userId=' + req.user.userDataId);
  } else {
    return res.redirect('/createProfile');
  }
});

router.use('/contact', contact);
router.use('/users', users);

//* ************* LOGIN WALL *******************
router.use((req, res, next) => {
  return req.user && req.user.userDataId ? next() : res.status(401).send('YOU MUST BE AUTHENTICATED TO ACCESS THIS ROUTE');
});

// Restful endpoints
router.use('/events', events);
router.use('/emails', emails);

// Error handler
router.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({
    'error': err.message
  })
});

module.exports = router;
