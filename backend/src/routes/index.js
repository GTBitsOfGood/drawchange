// NPM Packages
const express = require('express');
const router = express.Router();

// Local Imports
const auth = require('../auth');
// const events = require('./events');
const users = require('./users');

// Constants
// Reading a environment variable multiple times impacts performance, so save in local variable
const NODE_ENV = process.env.NODE_ENV;

// Restful endpoints
router.use('/users', auth.isAuthenticated, users);
// router.use('/events', auth.isAuthenticated, events);

// Error handler
router.use((err, req, res, next) => {
  console.error(`error - ${req.id} - ${err.name} - ${err.message}`);
  return res.status(500).json({
    error:
      NODE_ENV === 'production'
        ? 'An unknown error has occurred'
        : `Unexpected Error - ${err.message}`,
    requestId: req.id
  });
});

module.exports = router;
