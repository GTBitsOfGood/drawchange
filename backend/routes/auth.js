// NPM Packages
const express = require('express');
const passport = require('passport');
const { check, oneOf, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();

// Local Imports
const User = require('../models/user');

router.use(passport.initialize());
router.use(passport.session());


// Passport Config
passport.use(new LocalStrategy({
  usernameField: 'email',
},
  function (email, password, done) {
    User.findOne({ email }, function (err, user) {
      if (err) return done(err);
      if (!user || !user.verifyPassword(password)) {
        return done(null, false, { message: 'Login Error.' });
      }
      return done(null, user);
    });
  }));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


// Login Route
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/api/auth/success',
    failureRedirect: '/api/auth/failed'
  })
);

// Login Failed Route
router.get('/failed', (req, res) => {
  res.status(400).json({ authenticated: false });
});

// Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ logout: 'success' });
});

//************** LOGIN WALL *******************
router.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send('YOU MUST BE AUTHENTICATED TO ACCESS THIS ROUTE');
  }
});

// Login Success Route
router.get('/success', (req, res) => {
  res.json({ authenticated: true, user: req.user });
});

module.exports = router;