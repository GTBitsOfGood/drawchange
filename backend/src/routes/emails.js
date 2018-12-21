// NPM Packages
const express = require('express');
const { check, oneOf, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const router = express.Router();

// Local Imports
const Email = require('../models/email');


router.route('/')
  .get((req, res) => {
    Email.find()
      .then(emails => res.status(200).json({ emails }))
      .catch(({ errors }) => res.status(500).json({ errors }));
  })
  .post([ //TODO Add validations for recipients Array
    check('from').exists().isAscii().trim().escape(),
    check('subject').exists().isAscii().trim().escape(),
    check('text').exists().isAscii().trim().escape(),
    check('recipients').exists(),
    check('is_html').exists().isBoolean(),
    // check('recipients').custom(value => {
    //   if ()
    // })
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const emailData = matchedData(req);
    const newEmail = new Email(emailData);
    newEmail.save()
      .then(email => res.status(200).json({ email }))
      .catch((errors) => {
        if (recipients.length == 0) {
          res.status(422).json({ errors });
        } else {
          res.status(500).json({ errors });
        }

    });
  });

router.route('/:id')
  .get([ check('id').isMongoId() ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    Email.findById(req.params.id)
      .then(email => {
        email
          ? res.status(200).json({ email })
          : res.status(404).json({ errors: `No response found with id: ${req.params.id}`});
      })
      .catch(errors => { res.status(500).json({ errors }); });
  })
  .put([check('id').isMongoId()], oneOf([ //TODO Add validations for voluntters Array
    check('from').exists().isAscii().trim().escape(),
    check('subject').exists().isAscii().trim().escape(),
    check('text').exists().isAscii().trim().escape(),
    check('recipients').exists(),
    check('is_html').exists().isBoolean(),
    // check('volunteers').custom(value => {
    //   if ()
    // })
  ]), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const emailData = matchedData(req);

    Email.findById(req.params.id)
      .then(email => {
        if (!email) {
          return res.status(404).json({ errors: `No email found with id: ${req.params.id}`});
        }

        for (let key in email) {
          email[key] = emailData[key] !== undefined ? emailData[key] : email[key]
        }
        email.save();
        return res.status(200).json({ email });
      })
      .catch(({ errors }) => res.status(500).json({ errors }));
  })
  .delete([ check('id').isMongoId() ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    Email.findByIdAndRemove(req.params.id)
      .then(removed => {
        removed
              ? res.status(200).json({ removed })
              : res.status(404).json({ errors : `No response found with id: ${req.params.id}`});
      })
      .catch(errors => { res.status(500).json({ errors });});
  });

module.exports = router;