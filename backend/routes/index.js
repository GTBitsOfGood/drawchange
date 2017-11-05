// NPM Packages
const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();

// Local Imports
const User = require('../models/user');
const events = require('./events');
const emails = require('./emails');
const responses = require('./responses');
const surveys = require('./surveys');
const users = require('./users');
``
// Middleware
router.use(morgan('dev'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(session({
  secret: process.env.SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: true,
  saveUninitialized: false
}));
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
    successRedirect: '/api/success',
    failureRedirect: '/api/failed'
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

router.use('/users', users);

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

// // Restful endpoints
router.use('/responses', responses);
router.use('/surveys', surveys);
router.use('/events', events);
router.use('/emails', emails);

module.exports = router;

