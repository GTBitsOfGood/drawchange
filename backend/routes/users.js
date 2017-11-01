// NPM Packages
const express = require('express');
const { check, oneOf, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const router = express.Router();

// Local Imports
const User = require('../models/user');

router.route('/')
  .get((req, res) => {
    User.find()
      .then(users => res.status(200).json({ users }))
      .catch(errors =>  res.status(500).json({ errors }));
  })
  .post([ //TODO Add validations for events and survey_responses Array
    check('first_name').isAlpha().trim().escape(),
    check('last_name').isAlpha().trim().escape(),
    check('email').isEmail().trim(),
    check('street_address').isAscii().trim().escape(),
    check('city').isAlpha().trim().escape(),
    check('state').isAlpha().trim().escape(),
    check('zip_code').isAscii().trim().escape(),
    check('phone_number').isAscii().trim().escape(),
    check('date_of_birth').exists().trim().escape()
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const userData = matchedData(req);
    userData.events = req.body.events;
    userData.survey_responses = req.body.survey_responses;
    userData.role = req.body.role;
    const newUser = new User(userData);
    newUser.save()
      .then(user => res.status(200).json({ user }))
      .catch(errors =>  res.status(500).json({ errors }));
  });

router.route('/:id')
    .get([ check('id').isMongoId() ], (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
      }
      User.findById(req.params.id)
        .then(user => {
          user
            ? res.status(200).json({ user })
            : res.status(404).json({ errors: `No User found with id: ${req.params.id}`});
        })
        .catch(errors =>  res.status(500).json({ errors }));
    })
    .put([check('id').isMongoId()], oneOf([ //TODO Add validations for events and survey_responses Array
      check('first_name').isAlpha().trim().escape(),
      check('last_name').isAlpha().trim().escape(),
      check('role').isAlpha().trim().escape(),
      check('email').isEmail().trim(),
      check('street_address').isAscii().trim().escape(),
      check('city').isAlpha().trim().escape(),
      check('state').isAlpha().trim().escape(),
      check('zip_code').isAscii().trim().escape(),
      check('phone_number').isAscii().trim().escape(),
      check('date_of_birth').exists().trim().escape()
    ]), (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
      }

      const userData = matchedData(req);
      userData.events = req.body.events;
      userData.survey_responses = req.body.survey_responses;

      User.findById(req.params.id)
        .then(user => {

          if (!user) {
            return res.status(404).json({ errors: `No user found with id: ${req.params.id}`});
          }
          for (let key in user) {
            user[key] = userData[key] !== undefined ? userData[key] : user[key]
          }

          user.save();
          return res.status(200).json({ user });
        })
        .catch(errors => res.status(500).json({ errors }));
    })
    .delete([ check('id').isMongoId() ], (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
      }
      User.findByIdAndRemove(req.params.id)
        .then(removed => {
          removed
                ? res.status(200).json({ removed })
                : res.status(404).json({ errors: `No response found with id: ${req.params.id}`});
        })
        .catch(errors =>  res.status(500).json({ errors }));
    });


module.exports = router;