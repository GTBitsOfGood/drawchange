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
const users = require('./users');

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
  function(email, password, done) {
    User.findOne({ "bio.email": email }, function(err, user) {
      if (err) return done(err);
      if (!user || !user.verifyPassword(password)) {
        return done(null, false, { message: 'Login Error.' });
      }
      return done(null, user);
    });
  }));

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    return done(err, user);
  });
});


// Login Route
router.post('/login', (req, res) => {
  passport.authenticate('local', (errors, user) => {
    req.logIn(user, () => {
      if (errors) return res.status(500).json({ errors });
      return res.status(user ? 200 : 400).json(user ? { user } : { errors: "Login Failed" });
    });
  })(req, res);
});

// Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  return res.status(200).json({ logout: 'success' });
});

router.use('/users', users);

//* ************* LOGIN WALL *******************
router.use((req, res, next) => {
  return req.user ? next() : res.status(401).send('YOU MUST BE AUTHENTICATED TO ACCESS THIS ROUTE');
});

// Restful endpoints
router.use('/events', events);
router.use('/emails', emails);

module.exports = router;

