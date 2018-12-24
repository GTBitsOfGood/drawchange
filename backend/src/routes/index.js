// NPM Packages
const express = require('express');
const router = express.Router();

// Local Imports
const auth = require('../auth');
const events = require('./events');
const emails = require('./emails');
const users = require('./users');
const contact = require('./contact');

router.use('/contact', contact);
router.use('/users', users);

// Restful endpoints
router.use('/events', auth.isAuthenticated, events);
router.use('/emails', auth.isAuthenticated, emails);

// Error handler
router.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({
    error: err.message
  });
});

module.exports = router;
