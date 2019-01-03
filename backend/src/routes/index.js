// NPM Packages
const express = require('express');
const router = express.Router();

// Local Imports
const auth = require('../auth');
const events = require('./events');
const users = require('./users');

// Restful endpoints
router.use('/users', auth.isAuthenticated, users);
router.use('/events', auth.isAuthenticated, events);

// Error handler
router.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({
    error: err.message
  });
});

module.exports = router;
