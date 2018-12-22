// NPM Packages
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();

// Local Imports
const User = require('../models/user');
const events = require('./events');
const emails = require('./emails');
const users = require('./users');
const contact = require('./contact');

// Middleware
router.use(passport.initialize());
router.use(passport.session());

// Passport Config
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    function(email, password, done) {
      User.findOne({ 'bio.email': email }, function(err, user) {
        if (err) return done(err);
        if (!user || !user.verifyPassword(password)) {
          return done(null, false, { message: 'Login Error.' });
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    return done(err, user);
  });
});

// Login Route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err)
    } else if (!user) {
      return res.status(401).json({ errors: 'Login Failed' });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }
      // Remove password before sending user
      user.bio.password = undefined;
      return res.status(200).json({ user });
    });

  })(req, res);
});

// Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  return res.status(200).json({ logout: 'success' });
});

router.use('/contact', contact);
router.use('/users', users);

//* ************* LOGIN WALL *******************
router.use((req, res, next) => {
  return req.user ? next() : res.status(401).send('YOU MUST BE AUTHENTICATED TO ACCESS THIS ROUTE');
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
