// NPM Packages
const express = require('express');
const router = express.Router();
const { check, oneOf, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');

// Local Imports
const UserData = require('../models/userData');
const EmailService = require('../services/emailService');
const { SendEmailError, EmailInUseError } = require('../util/errors');
const { USER_DATA_VALIDATOR } = require('../util/validators');

router.post('/', USER_DATA_VALIDATOR, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
      return res.status(400).json({ errors: errors.mapped() });
    }
    const newUserData = matchedData(req);
    let userData = null;
    UserData.findOne({ 'bio.email': newUserData.bio.email })
      .then(user => {
        if (user) {
          throw new EmailInUseError(`Email ${newUserData.bio.email} already in use`, newUserData.bio.email);
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
        // Volunteer application confirmation email
        return EmailService.sendApplicationConfirmation(userData);
      })
      .then(() => {
        res.status(200).json({ userData });
      })
      .catch(err => {
        if (err instanceof EmailInUseError) {
          return res.status(400).json({
            error: 'Email in use',
            emailInUse: true
          });
        }

        if (err instanceof SendEmailError) {
          return res.status(400).json({
            error: err.message,
            emailError: true
          });
        }

        // Generic error handler
        return next(err);
      });
  }
);

router.get('/', (req, res, next) => {
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
    [check('id').isMongoId()],
    oneOf(USER_DATA_VALIDATOR),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
      }

      const userDataReq = matchedData(req);
      const events = req.body.events;

      let savedUserData = null;
      UserData.findById(req.params.id)
        .then(user => {
          if (!user) {
            return res.status(404).json({ errors: `No user found with id: ${req.params.id}` });
          }

          if (req.query.action === 'appendEvent') {
            events.forEach(eventId => user.events.push(eventId));
          } else if (req.query.action === 'removeEvents') {
            events.forEach(eventId =>
              user.events.splice(user.events.indexOf(eventId), 1)
            );
          }

          delete userDataReq.id; // we do not want to update the user's id
          updateUserObjectFromRequest(userDataReq, user);

          // Save to db
          return user.save();
        })
        .then(user => {
          // Save user for later
          savedUserData = user;

          // Send email if volunteer status has changed
          if (userDataReq.bio.role === 'pending' && (user.bio.role === 'denied' || user.bio.role === 'deleted')) {
            // In these cases, the user was rejected
            return EmailService.sendApplicationRejected(user);
          } else if (userDataReq.bio.role === 'pending' && user.bio.role !== 'pending') {
            // All other cases where the role changed, the user was accepted
            return EmailService.sendApplicationAccepted(user);
          }

          // All other cases, no change in role
          return Promise.resolve();
        })
        .then(() => {
          return res.status(200).json({ savedUserData });
        })
        .catch(err => {
          if (err instanceof SendEmailError) {
            return res.status(400).json({
              error: err.message,
              emailError: true
            });
          }

          // Generic error handler
          return next(err);
        });
    }
  )
  .delete(
    [check('id').isMongoId()],
    (req, res, next) => {
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
          if (!removed) {
            return res.status(404).json({ errors: `No user found with id: ${req.params.id}` });
          }

          return res.status(200).json({ removed })
        })
        .catch(err => next(err));
    });

/**
 * Side Affect: Modifies `dbUser`
 */
function updateUserObjectFromRequest(reqUser, dbUser) {
  for (const key1 in reqUser) {
    if (reqUser.hasOwnProperty(key1)) {
      const obj = reqUser[key1];
      const userObj = dbUser[key1];
      for (const key2 in obj) {
        if (obj.hasOwnProperty(key2)) {
          userObj[key2] = obj[key2] !== undefined ? obj[key2] : userObj[key2];
        }
      }
      dbUser[key1] = userObj;
    }
  }
}

module.exports = router;
