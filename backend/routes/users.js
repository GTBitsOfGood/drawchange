// NPM Packages
const express = require('express');
const { check, oneOf, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const bcrypt = require('bcrypt');
const router = express.Router();

// Local Imports
const User = require('../models/user');


// This method is purposely put before the login wall so that
// new users can be created w/o needing to be signed in...
router.post('/', [
  check('first_name').isAlpha().trim().escape(),
  check('password').isAscii().trim().escape(),
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
  let emailInUse = false;
  User.findOne({ email: userData.email })
    .then(user => {
      if (user) {
        emailInUse = true;
        throw new Error("Email already in use")
        return null;
      }
      return bcrypt.hash(userData.password, 10)})
    .then(hash => {
      userData.password = hash;
      const newUser = new User(userData);
      return newUser.save();
    })
    .then(user => res.status(200).json({ user }))
    .catch(errors => {
      if (emailInUse) {
        return res.status(400).json({errors: "Email in use"});
      }
      res.status(500).send(errors);
    });
});

//************** LOGIN WALL *******************
router.use((req, res, next) => {
  return req.user ? next() : res.status(401).send('YOU MUST BE AUTHENTICATED TO ACCESS THIS ROUTE');
});

router.get('/', (req, res) => {
    User.find()
      .then(users => res.status(200).json({ users }))
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
      check('date_of_birth').exists().trim().escape(),
      check('password').isAscii().trim().escape()
    ]), (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
      }

      const userData = matchedData(req);
      userData.events = req.body.events;
      userData.survey_responses = req.body.survey_responses;

      if (userData.password) {
        bcrypt.hash(userData.password, 10)
          .then(hash => {
            userData.password = hash;
            return User.findById(req.params.id)
          })
          .then(user => {
            if (!user) {
              return res.status(404).json({ errors: `No user found with id: ${req.params.id}` });
            }
            for (let key in user) {
              user[key] = (userData[key] !== undefined) ? userData[key] : user[key]
            }

            user.save();
            return res.status(200).json({ user });
          })
          .catch(errors => res.status(500).json({ errors }));
      } else {
        User.findById(req.params.id)
          .then(user => {
            if (!user) {
              return res.status(404).json({ errors: `No user found with id: ${req.params.id}` });
            }
            for (let key in user) {
              user[key] = (userData[key] !== undefined) ? userData[key] : user[key]
            }

            user.save();
            return res.status(200).json({ user });
          })
          .catch(errors => res.status(500).json({ errors }));
      }

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