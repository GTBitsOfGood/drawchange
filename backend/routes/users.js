// NPM Packages
const express = require('express');
const router = express.Router();

// Local Imports
const User = require('../models/user');

router.route('/')
  .get((req, res) => {
      User.find().select('name id')
      .then(users => res.status(200).json({ users }))
      .catch((errors) => res.status(500).json({ errors }));
  });


module.exports = router;