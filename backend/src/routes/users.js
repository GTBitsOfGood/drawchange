// NPM Packages
const express = require('express');
const { check, oneOf, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const router = express.Router();

// Local Imports
const UserData = require('../models/userData');
const auth = require('../auth');

// Validations
// TODO Add validations for events and survey_responses Array
const USER_DATA_VALIDATIONS = [
  check('bio.first_name')
    .isAlpha()
    .trim()
    .escape(),
  check('bio.last_name')
    .isAlpha()
    .trim()
    .escape(),
  check('bio.phone_number')
    .isAscii()
    .trim()
    .escape(),
  check('bio.email')
    .isEmail()
    .trim(),
  check('bio.date_of_birth')
    .exists()
    .trim()
    .escape(),
  check('bio.street_address')
    .isAscii()
    .trim()
    .escape(),
  check('bio.city')
    .isAscii()
    .trim()
    .escape(),
  check('bio.state')
    .isAlpha()
    .trim()
    .escape(),
  check('bio.zip_code')
    .isAscii()
    .trim()
    .escape(),
  check('bio.languages')
    .isAscii()
    .trim()
    .escape(),
  check('history.volunteer_interest_cause')
    .isAscii()
    .trim()
    .escape(),
  check('history.volunteer_support')
    .isAscii()
    .trim()
    .escape(),
  check('history.volunteer_commitment')
    .isAscii()
    .trim()
    .escape(),
  check('history.skills_qualifications')
    .isAscii()
    .trim()
    .escape(),
  check('history.previous_volunteer_experience')
    .isAscii()
    .trim()
    .escape(),
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
  check('employment.name')
    .isAscii()
    .trim()
    .escape(),
  check('employment.position')
    .isAscii()
    .trim()
    .escape(),
  check('employment.duration')
    .isAscii()
    .trim()
    .escape(),
  check('employment.location')
    .isAscii()
    .trim()
    .escape(),
  check('employment.previous_name')
    .isAscii()
    .trim()
    .escape(),
  check('employment.previous_reason_for_leaving')
    .isAscii()
    .trim()
    .escape(),
  check('employment.previous_location')
    .isAscii()
    .trim()
    .escape(),
  check('reference.name')
    .isAscii()
    .trim()
    .escape(),
  check('reference.phone_number')
    .isAscii()
    .trim()
    .escape(),
  check('reference.email')
    .isEmail()
    .trim()
    .escape(),
  check('reference.relationship')
    .isAscii()
    .trim()
    .escape(),
  check('reference.duration')
    .isAscii()
    .trim()
    .escape(),
  check('criminal.felony').isBoolean(),
  check('criminal.sexual_violent').isBoolean(),
  check('criminal.drugs').isBoolean(),
  check('criminal.driving').isBoolean(),
  check('criminal.explanation')
    .isAscii()
    .trim()
    .escape(),
  check('ice.name')
    .isAscii()
    .trim()
    .escape(),
  check('ice.relationship')
    .isAscii()
    .trim()
    .escape(),
  check('ice.phone_number')
    .isAscii()
    .trim()
    .escape(),
  check('ice.email')
    .isEmail()
    .trim()
    .escape(),
  check('ice.address')
    .isAscii()
    .trim()
    .escape(),
  check('permissions.comments')
    .isAscii()
    .trim()
    .escape(),
  check('permissions.reference').isBoolean(),
  check('permissions.personal_image').isBoolean(),
  check('permissions.email_list').isBoolean(),
  check('permissions.signature')
    .isAscii()
    .trim()
    .escape()
];

// This method is purposely put before the login wall so that
// new users can be created w/o needing to be signed in...
router.post('/', USER_DATA_VALIDATIONS, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
      return res.status(400).json({ errors: errors.mapped() });
    }
    const newUserData = matchedData(req);
    let emailInUse = false;
    let userData = null;
    UserData.findOne({ 'bio.email': newUserData.bio.email })
      .then(user => {
        if (user) {
          emailInUse = true;
          throw new Error(`Email ${newUserData.bio.email} already in use`);
        }
        return Promise.resolve();
      })
      .then(() => {
        const newUser = new UserData(newUserData);
        return newUser.save();
      })
      .then(savedUserData => {
        // Save data for response
        userData = savedUserData;

        if (req.user && !req.user.userDataId) {
          // First created user, associate with user credentials
          const userCreds = req.user;
          userCreds.userDataId = savedUserData.id;
          return userCreds.save();
        }

        return Promise.resolve();
      })
      .then(() => {
        res.status(200).json({ userData });
      })
      .catch(err => {
        if (emailInUse) {
          return res.status(400).json({ error: 'Email in use' });
        }
        next(err);
      });
  }
);

router.get('/', auth.isAuthenticated, (req, res, next) => {
  if (req.query.type === 'pending') {
    UserData.find({ 'bio.role': 'pending' })
      .then(users => res.status(200).json({ users }))
      .catch(err => next(err));
  } else if (req.query.type === 'new') {
    UserData.find()
      .sort('-createdAt')
      .then(users => res.status(200).json({ users }))
      .catch(err => next(err));
  } else if (req.query.type === 'volunteer') {
    UserData.find({ 'bio.role': 'volunteer' })
      .then(users => res.status(200).json({ users }))
      .catch(err => next(err));
  } else if (req.query.type === 'denied') {
    UserData.find({ 'bio.role': 'denied' })
      .then(users => res.status(200).json({ users }))
      .catch(err => next(err));
  } else if (req.query.type === 'deleted') {
    UserData.find({ 'bio.role': 'denied' })
      .then(users => res.status(200).json({ users }))
      .catch(err => next(err));
  } else {
    UserData.find()
      .then(users => res.status(200).json({ users }))
      .catch(err => next(err));
  }
});

router
  .route('/:id')
  .get(
    auth.isAuthenticated,
    [check('id').isMongoId()],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
      }
      UserData.findById(req.params.id)
        .then(user => {
          if (!user) {
            return res.status(404).json({ errors: `No User found with id: ${req.params.id}` });
          }
          res.status(200).json({ user });
        })
        .catch(err => next(err));
    })
  .put(
    auth.isAuthenticated,
    [check('id').isMongoId()],
    oneOf(USER_DATA_VALIDATIONS),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
      }

      const userDataReq = matchedData(req);
      userDataReq.events = req.body.events;

      UserData.findById(req.params.id)
        .then(user => {
          if (!user) {
            return res.status(404).json({ errors: `No user found with id: ${req.params.id}` });
          } else if (req.query.action === 'appendEvent') {
            userDataReq.events.forEach(eventId => user.events.push(eventId));
            userDataReq.events = undefined;
          } else if (req.query.action === 'removeEvents') {
            userDataReq.events.forEach(eventId =>
              user.events.splice(user.events.indexOf(eventId), 1)
            );
            userDataReq.events = undefined;
          }

          userDataReq.id = undefined; // we do not want to update the user's id
          for (const key1 in userDataReq) {
            if (userDataReq.hasOwnProperty(key1)) {
              const obj = userDataReq[key1];
              const userObj = user[key1];
              for (const key2 in obj) {
                if (obj.hasOwnProperty(key2)) {
                  userObj[key2] = obj[key2] !== undefined ? obj[key2] : userObj[key2];
                }
              }
              user[key1] = userObj;
            }
          }

          user.save();
          return res.status(200).json({ user });
        })
        .catch(err => next(err));
    }
  )
  .delete(auth.isAuthenticated, [check('id').isMongoId()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    if (req.user && req.user.userDataId === req.params.id) {
      // User is trying to remove themselves, don't let that happen...
      return res.status(403).json({
        error: 'Cannot delete yourself!'
      });
    }

    UserData.findByIdAndRemove(req.params.id)
      .then(removed => {
        removed
          ? res.status(200).json({ removed })
          : res.status(404).json({ errors: `No response found with id: ${req.params.id}` });
      })
      .catch(err => next(err));
  });

module.exports = router;
