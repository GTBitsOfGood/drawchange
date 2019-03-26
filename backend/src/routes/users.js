// NPM Packages
const express = require('express');
const router = express.Router();
const { check, oneOf, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');

// Local Imports
const UserData = require('../models/userData');
const SendgridService = require('../services/sendgridService');
const MailchimpService = require('../services/mailchimpService');
const { SendEmailError, EmailInUseError, SubscribeUserError } = require('../util/errors');
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
        throw new EmailInUseError(
          `Email ${newUserData.bio.email} already in use`,
          newUserData.bio.email
        );
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
      // Add to mailchimp (if permission given)
      if (userData.permissions.email_list) {
        return MailchimpService.addSubscriber(
          userData.bio.first_name,
          userData.bio.last_name,
          userData.bio.email
        );
      }
      // If no permission, just move on
      return Promise.resolve();
    })
    .then(() => {
      // Volunteer application confirmation email
      return SendgridService.sendApplicationConfirmation(userData);
    })
    .then(() => {
      res.status(200).json({ userData });
    })
    .catch(err => {
      if (
        err instanceof EmailInUseError ||
        err instanceof SendEmailError ||
        err instanceof SubscribeUserError
      ) {
        return res.status(400).json({
          error: err.message,
          errorType: err.name
        });
      }

      // Generic error handler
      return next(err);
    });
});

router.post('/filter', (req, res, next) => {
  const filters = JSON.parse(req.body.data);
  let roleFilter = [];
  if (filters.role) {
    roleFilter = Object.keys(filters.role).reduce((query, key) => [...query, { role: key }], []);
    delete filters.role;
  }
  UserData.find(roleFilter.length ? { ...filters, $or: roleFilter } : filters)
    .then(users => res.status(200).json({ users }))
    .catch(err => next(err));
});

router.get('/searchByContent', (req, res, next) => {
  const inputText = req.query.searchquery;
  const regexquery = { $regex: new RegExp(inputText), $options: 'i' };
  UserData.find({
    $or: [
      //{ $text: { $search: inputText } },
      { 'history.volunteer_interest_cause': regexquery },
      { 'history.volunteer_support': regexquery },
      { 'history.volunteer_commitment': regexquery },
      { 'history.previous_volunteer_experience': regexquery },
      { 'bio.street_address': regexquery },
      { 'bio.city': regexquery },
      { 'bio.state': regexquery },
      { 'bio.zip_code': regexquery },
      { 'bio.first_name': regexquery },
      { 'bio.last_name': regexquery },
      { 'bio.email': regexquery },
      { 'bio.phone_number': regexquery }
    ]
  })
    .then(users => res.status(200).json({ users }))
    .catch(err => next(err));
});

router.get('/searchByPhone', (req, res, next) => {
  const inputText = req.query.searchquery;
  const regexquery = { $regex: new RegExp(inputText), $options: 'i' };
  UserData.find({
    $or: [{ 'bio.phone_number': regexquery }]
  })
    .then(users => res.status(200).json({ users }))
    .catch(err => next(err));
});

router.get('/searchByBio', (req, res, next) => {
  const inputText = req.query.searchquery;
  const regexquery = { $regex: new RegExp(inputText), $options: 'i' };
  UserData.find({
    $or: [
      { 'bio.street_address': regexquery },
      { 'bio.city': regexquery },
      { 'bio.state': regexquery },
      { 'bio.zip_code': regexquery },
      { 'bio.first_name': regexquery },
      { 'bio.last_name': regexquery },
      { 'bio.email': regexquery },
      { 'bio.phone_number': regexquery }
    ]
  })
    .then(users => res.status(200).json({ users }))
    .catch(err => next(err));
});

router.get('/searchByEmail', (req, res, next) => {
  const inputText = req.query.searchquery;
  const regexquery = { $regex: new RegExp(inputText), $options: 'i' };
  UserData.find({
    $or: [{ 'bio.email': regexquery }]
  })
    .then(users => res.status(200).json({ users }))
    .catch(err => next(err));
});

router.get('/', (req, res, next) => {
  if (req.query.type === 'pending') {
    UserData.find({ role: 'pending' })
      .then(users => res.status(200).json({ users }))
      .catch(err => next(err));
  } else if (req.query.type === 'new') {
    UserData.find()
      .sort('-createdAt')
      .then(users => res.status(200).json({ users }))
      .catch(err => next(err));
  } else if (req.query.type === 'volunteer') {
    UserData.find({ role: 'volunteer' })
      .then(users => res.status(200).json({ users }))
      .catch(err => next(err));
  } else if (req.query.type === 'denied') {
    UserData.find({ role: 'denied' })
      .then(users => res.status(200).json({ users }))
      .catch(err => next(err));
  } else if (req.query.type === 'deleted') {
    UserData.find({ role: 'denied' })
      .then(users => res.status(200).json({ users }))
      .catch(err => next(err));
  } else {
    const filter = {};
    if (req.query.role) {
      try {
        const roleFilter = Object.keys(JSON.parse(req.query.role)).reduce(
          (query, key) => [...query, { role: key }],
          []
        );
        if (!roleFilter.length) {
          res.status(400).json({ error: 'Invalid role param' });
        }
        filter.$or = roleFilter;
      } catch (e) {
        res.status(400).json({ error: 'Invalid role param' });
      }
    }
    if (req.query.availability) {
      try {
        filter.availability = JSON.parse(req.query.availability);
      } catch (e) {
        res.status(400).json({ error: 'Invalid availability param' });
      }
    }
    if (req.query.skills_interests) {
      try {
        filter.skills_interests = JSON.parse(req.query.skills_interests);
      } catch (e) {
        res.status(400).json({ error: 'Invalid skills_interests param' });
      }
    }
    UserData.find(filter)
      .then(users => res.status(200).json({ users }))
      .catch(err => next(err));
  }
});

router.post('/updateStatus', (req, res, next) => {
  if (!req.query.email || !req.query.status)
    res.status(400).json({ error: 'Invalid email or status sent' });
  const { email, status } = req.query;
  UserData.updateOne({ 'bio.email': email }, { $set: { status: status } }).then(result => {
    if (!result.nModified)
      res.status(400).json({ error: 'Email requested for update was invalid. 0 items changed.' });
    res.sendStatus(200);
  });
});

router
  .route('/:id')
  .get([check('id').isMongoId()], (req, res, next) => {
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
  .put([check('id').isMongoId()], oneOf(USER_DATA_VALIDATOR), (req, res, next) => {
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
          events.forEach(eventId => user.events.splice(user.events.indexOf(eventId), 1));
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
        if (userDataReq.role === 'pending' && (user.role === 'denied' || user.role === 'deleted')) {
          // In these cases, the user was rejected
          return SendgridService.sendApplicationRejected(user);
        } else if (userDataReq.role === 'pending' && user.role !== 'pending') {
          // All other cases where the role changed, the user was accepted
          return SendgridService.sendApplicationAccepted(user);
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
            errorType: err.name
          });
        }

        // Generic error handler
        return next(err);
      });
  })
  .delete([check('id').isMongoId()], (req, res, next) => {
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

        return res.status(200).json({ removed });
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
