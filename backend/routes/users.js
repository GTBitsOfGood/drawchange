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
  check('bio.first_name').isAlpha().trim().escape(),
  check('bio.last_name').isAlpha().trim().escape(),
  check('bio.phone_number').isAscii().trim().escape(),
  check('bio.email').isEmail().trim(),
  check('bio.date_of_birth').exists().trim().escape(),
  check('bio.street_address').isAscii().trim().escape(),
  check('bio.city').isAlpha().trim().escape(),
  check('bio.state').isAlpha().trim().escape(),
  check('bio.zip_code').isAscii().trim().escape(),
  check('bio.password').isAscii().trim().escape(),
  check('bio.languages').isAscii().trim().escape(),
  check('history.volunteer_interest_cause').isAscii().trim().escape(),
  check('history.volunteer_support').isAscii().trim().escape(),
  check('history.volunteer_commitment').isAscii().trim().escape(),
  check('history.skills_qualifications').isAscii().trim().escape(),
  check('history.previous_volunteer_experience').isAscii().trim().escape(),
  check('availability.weekday_mornings').isBoolean(),
  check('availability.weekday_afternoons').isBoolean(),
  check('availability.weekday_evenings').isBoolean(),
  check('availability.weekend_mornings').isBoolean(),
  check('availability.weekend_afternoons').isBoolean(),
  check('availability.weekend_evenings').isBoolean(),
  check('skills_interests.admin_in_office').isBoolean(),
  check('skills_interests.admin_virtual').isBoolean(),
  check('skills_interests.atlanta_shelter').isBoolean(),
  check('skills_interests.orlando_shelter').isBoolean(),
  check('skills_interests.graphic_web_design').isBoolean(),
  check('skills_interests.special_events').isBoolean(),
  check('skills_interests.grant_writing').isBoolean(),
  check('skills_interests.writing_editing').isBoolean(),
  check('skills_interests.social_media').isBoolean(),
  check('skills_interests.fundraising').isBoolean(),
  check('skills_interests.finance').isBoolean(),
  check('skills_interests.office_maintenance_housekeeping').isBoolean(),
  check('skills_interests.international_projects').isBoolean(),
  check('skills_interests.volunteer_coordination').isBoolean(),
  check('skills_interests.outreach').isBoolean(),
  check('referral.friend').isBoolean(),
  check('referral.newsletter').isBoolean(),
  check('referral.event').isBoolean(),
  check('referral.volunteer_match').isBoolean(),
  check('referral.internet').isBoolean(),
  check('referral.social_media').isBoolean(),
  check('employment.name').isAscii().trim().escape(),
  check('employment.position').isAscii().trim().escape(),
  check('employment.duration').isAscii().trim().escape(),
  check('employment.location').isAscii().trim().escape(),
  check('employment.previous_name').isAscii().trim().escape(),
  check('employment.previous_reason_for_leaving').isAscii().trim().escape(),
  check('employment.previous_location').isAscii().trim().escape(),
  check('reference.name').isAscii().trim().escape(),
  check('reference.phone_number').isAscii().trim().escape(),
  check('reference.email').isEmail().trim().escape(),
  check('reference.relationship').isAscii().trim().escape(),
  check('reference.duration').isAscii().trim().escape(),
  check('criminal.felony').isBoolean(),
  check('criminal.sexual_violent').isBoolean(),
  check('criminal.drugs').isBoolean(),
  check('criminal.driving').isBoolean(),
  check('criminal.explanation').isAscii().trim().escape(),
  check('ice.name').isAscii().trim().escape(),
  check('ice.relationship').isAscii().trim().escape(),
  check('ice.phone_number').isAscii().trim().escape(),
  check('ice.email').isEmail().trim().escape(),
  check('ice.address').isAscii().trim().escape(),
  check('permissions.comments').isAscii().trim().escape(),
  check('permissions.reference').isBoolean(),
  check('permissions.personal_image').isBoolean(),
  check('permissions.email_list').isBoolean(),
  check('permissions.signature').isAscii().trim().escape(),

], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }
  const userData = matchedData(req);
  let emailInUse = false;
  User.findOne({ 'bio.email': userData.bio.email })
    .then(user => {
      if (user) {
        emailInUse = true;
        throw new Error("Email already in use");
      }
      return bcrypt.hash(userData.bio.password, 10);
    })
    .then(hash => {
      userData.bio.password = hash;
      const newUser = new User(userData);
      return newUser.save();
    })
    .then(user => {
      user.bio.password = undefined;
      res.status(200).json({ user });
    })
    .catch(errors => {
      console.log(errors);
      if (emailInUse) {
        return res.status(400).json({errors: "Email in use"});
      }
      res.status(500).send(errors);
    });
});

//* ************* LOGIN WALL *******************
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
    .put([check('id').isMongoId()], oneOf([ // TODO Add validations for events and survey_responses Array
      check('bio.role').isAlpha().trim().escape(),
      check('bio.first_name').isAlpha().trim().escape(),
      check('bio.last_name').isAlpha().trim().escape(),
      check('bio.phone_number').isAscii().trim().escape(),
      check('bio.email').isEmail().trim(),
      check('bio.date_of_birth').exists().trim().escape(),
      check('bio.street_address').isAscii().trim().escape(),
      check('bio.city').isAlpha().trim().escape(),
      check('bio.state').isAlpha().trim().escape(),
      check('bio.zip_code').isAscii().trim().escape(),
      check('bio.password').isAscii().trim().escape(),
      check('bio.languages').isAscii().trim().escape(),
      check('history.volunteer_interest_cause').isAscii().trim().escape(),
      check('history.volunteer_support').isAscii().trim().escape(),
      check('history.volunteer_commitment').isAscii().trim().escape(),
      check('history.skills_qualifications').isAscii().trim().escape(),
      check('history.previous_volunteer_experience').isAscii().trim().escape(),
      check('availability.weekday_mornings').isBoolean(),
      check('availability.weekday_afternoons').isBoolean(),
      check('availability.weekday_evenings').isBoolean(),
      check('availability.weekend_mornings').isBoolean(),
      check('availability.weekend_afternoons').isBoolean(),
      check('availability.weekend_evenings').isBoolean(),
      check('skills_interests.admin_in_office').isBoolean(),
      check('skills_interests.admin_virtual').isBoolean(),
      check('skills_interests.atlanta_shelter').isBoolean(),
      check('skills_interests.orlando_shelter').isBoolean(),
      check('skills_interests.graphic_web_design').isBoolean(),
      check('skills_interests.special_events').isBoolean(),
      check('skills_interests.grant_writing').isBoolean(),
      check('skills_interests.writing_editing').isBoolean(),
      check('skills_interests.social_media').isBoolean(),
      check('skills_interests.fundraising').isBoolean(),
      check('skills_interests.finance').isBoolean(),
      check('skills_interests.office_maintenance_housekeeping').isBoolean(),
      check('skills_interests.international_projects').isBoolean(),
      check('skills_interests.volunteer_coordination').isBoolean(),
      check('skills_interests.outreach').isBoolean(),
      check('referral.friend').isBoolean(),
      check('referral.newsletter').isBoolean(),
      check('referral.event').isBoolean(),
      check('referral.volunteer_match').isBoolean(),
      check('referral.internet').isBoolean(),
      check('referral.social_media').isBoolean(),
      check('employment.name').isAscii().trim().escape(),
      check('employment.position').isAscii().trim().escape(),
      check('employment.duration').isAscii().trim().escape(),
      check('employment.location').isAscii().trim().escape(),
      check('employment.previous_name').isAscii().trim().escape(),
      check('employment.previous_reason_for_leaving').isAscii().trim().escape(),
      check('employment.previous_location').isAscii().trim().escape(),
      check('reference.name').isAscii().trim().escape(),
      check('reference.phone_number').isAscii().trim().escape(),
      check('reference.email').isEmail().trim().escape(),
      check('reference.relationship').isAscii().trim().escape(),
      check('reference.duration').isAscii().trim().escape(),
      check('criminal.felony').isBoolean(),
      check('criminal.sexual_violent').isBoolean(),
      check('criminal.drugs').isBoolean(),
      check('criminal.driving').isBoolean(),
      check('criminal.explanation').isAscii().trim().escape(),
      check('ice.name').isAscii().trim().escape(),
      check('ice.relationship').isAscii().trim().escape(),
      check('ice.phone_number').isAscii().trim().escape(),
      check('ice.email').isEmail().trim().escape(),
      check('ice.address').isAscii().trim().escape(),
      check('permissions.comments').isAscii().trim().escape(),
      check('permissions.reference').isBoolean(),
      check('permissions.personal_image').isBoolean(),
      check('permissions.email_list').isBoolean(),
      check('permissions.signature').isAscii().trim().escape(),
      check('events').exists(),
    ]), (req, res, query) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
      }

      const userData = matchedData(req);
      userData.events = req.body.events;

      if (userData.bio.password) { // if we want to update password
        bcrypt.hash(userData.bio.password, 10)
          .then(hash => {
            userData.bio.password = hash;
            return User.findById(req.params.id);
          })
          .then(user => {
            if (!user) {
              return res.status(404).json({ errors: `No user found with id: ${req.params.id}` });
            }
            userData.id = undefined; // we do not want to update the user's id
            for (const key1 in userData) {
              if (userData.hasOwnProperty(key1)) {
                const obj = userData[key1];
                const userObj = user[key1];
                for (const key2 in obj) {
                  if (obj.hasOwnProperty(key2)) {
                    userObj[key2] = (obj[key2] !== undefined) ? obj[key2] : userObj[key2];
                  }
                }
                user[key1] = userObj;
              }
            }

            user.save();
            return res.status(200).json({ user });
          })
          .catch(errors => {console.log(errors); res.status(500).json({ errors });});
      } else { // we do not want to update password
        User.findById(req.params.id)
          .then(user => {
            if (!user) {
              return res.status(404).json({ errors: `No user found with id: ${req.params.id}` });
            } else if (req.query.action === 'appendEvents') {
              userData.events.forEach(eventId => user.events.push(eventId));
              userData.events = undefined;
            } else if (req.query.action === 'removeEvents') {
              userData.events.forEach(eventId => user.events.splice(user.events.indexOf(eventId), 1));
              userData.events = undefined;
            }

            userData.id = undefined; // we do not want to update the user's id
            for (const key1 in userData) {
              if (userData.hasOwnProperty(key1)) {
                const obj = userData[key1];
                const userObj = user[key1];
                for (const key2 in obj) {
                  if (obj.hasOwnProperty(key2)) {
                    userObj[key2] = (obj[key2] !== undefined) ? obj[key2] : userObj[key2];
                  }
                }
                user[key1] = userObj;
              }
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