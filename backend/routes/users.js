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
    .post((req, res) => {
        const { first_name, last_name, email, street_address, city, state,
            zip_code, phone_number, date_of_birth, age, events, survey_responses } = req.body;
        const newUser = new User({ first_name, last_name, email, street_address, city, state,
            zip_code, phone_number, date_of_birth, age, events, survey_responses });
        newUser.save()
          .then(event => res.status(200).json({ event }))
          .catch((errors) => {
            res.status(500).json({ errors });
        });
    });

router.route('/:user_id')
    .get((req, res) => {
        User.findById(req.params.id)
            .then(response => {
                response
                   ? res.status(200).json({ response })
                   : res.status(404).json({Error: 'No response found with id: ${req.params.id}'})
            })
            .catch(errors => {
                res.status(500).json({ errors });
            })
    })
    .put((req, res) => {
        const { first_name, last_name, email, street_address, city, state,
            zip_code, phone_number, date_of_birth, age, events, survey_responses } = req.body;
        User.findById(req.params.id)
            .then(response => {
                if (first_name !== undefined) {
                    response.first_name = first_name;
                }
                if (last_name !== undefined) {
                    response.last_name = last_name;
                }
                if (email !== undefined) {
                    response.email = email;
                }
                if (street_address !== undefined) {
                    response.street_address = street_address;
                }
                if (city !== undefined) {
                    response.city = city;
                }
                if (state !== undefined) {
                    response.state = state;
                }
                if (zip_code !== undefined) {
                    response.zip_code = zip_code;
                }
                if (phone_number !== undefined) {
                    response.phone_number = phone_number;
                }
                if (date_of_birth !== undefined) {
                    response.date_of_birth = date_of_birth;
                }
                if (age !== undefined) {
                    response.age = age;
                }
                if (events !== undefined) {
                    response.events = events;
                }
                if (survey_responses !== undefined) {
                    response.survey_responses = survey_responses;
                }
                /**TODO: not the best way to check; find a better way**/
                response.save();
                res.status(200).json({ response });
            })
            .catch(({ errors }) => res.status(500).json({ errors }));
    })
    .delete((req, res) => {
        User.findByIdAndRemove(req.params.id)
            .then(removed => {
                removed
                    ? res.status(200).json({removed})
                    : res.status(404).json({Error: "No response found with id: ${req.params.id}"})
            })
            .catch(errors => {
                res.status(500).json({errors});
            })
    });
router.route(':/id')

module.exports = router;