// NPM Packages
const express = require('express');
const router = express.Router();

// Local Imports
const User = require('../models/user');

router.route('/')
  .get((req, res) => {
    User.find().select('name id')
      .then(users => res.status(200).json({ users }))
      .catch(errors =>  res.status(500).json({ errors }));
  })
  .post((req, res) => {
    const { first_name, last_name, email, street_address, city, state,
          zip_code, phone_number, date_of_birth, events, survey_responses } = req.body;
    const newUser = new User({ first_name, last_name, email, street_address, city, state,
      zip_code, phone_number, date_of_birth, events, survey_responses });
    newUser.save()
      .then(event => res.status(200).json({ event }))
      .catch(errors =>  res.status(500).json({ errors }));
  });

router.route('/:id')
    .get((req, res) => {
      User.findById(req.params.id)
        .then(response => {
          response
            ? res.status(200).json({ response })
            : res.status(404).json({Error: 'No response found with id: ${req.params.id}'});
        })
        .catch(errors =>  res.status(500).json({ errors }));
    })
    .put((req, res) => {
      const { first_name, last_name, email, street_address, city, state,
            zip_code, phone_number, date_of_birth, age, events, survey_responses } = req.body;
      User.findById(req.params.id)
        .then(response => {
          response.first_name = first_name || response.first_name;
          response.last_name = last_name || response.last_name;
          response.email = email || response.email;
          response.street_address = street_address || response.street_address;
          response.city = city || response.city;
          response.state = state || response.state;
          response.zip_code = zip_code || response.zip_code;
          response.phone_number = phone_number || response.phone_number;
          response.date_of_birth = date_of_birth || response.date_of_birth;
          response.events = events || response.events;
          response.survey_responses = survey_responses || response.survey_responses;

          response.save();
          res.status(200).json({ response });
        })
        .catch(errors =>  res.status(500).json({ errors }));
    })
    .delete((req, res) => {
      User.findByIdAndRemove(req.params.id)
        .then(removed => {
          removed
                ? res.status(200).json({removed})
                : res.status(404).json({Error: "No response found with id: ${req.params.id}"});
        })
        .catch(errors =>  res.status(500).json({ errors }));
    });


module.exports = router;