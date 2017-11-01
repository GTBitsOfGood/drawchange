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
  .post([
    check('from').exists().isAscii().trim().escape(),
    check('subject').exists().isAscii().trim().escape(),
    check('text').exists().isAscii().trim().escape(),
    check('recipients').exists(),
    check('is_html').exists(),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    const { from, subject, text, recipients, is_sent, sent_on, is_html } = req.body;
    const newEmail = new Email({ from, subject, text, recipients, is_sent, sent_on, is_html });
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
  .get([
      check('id').isMongoId()
    ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    Email.findById(req.params.id)
      .then(response => {
        response
          ? res.status(200).json({ response })
          : res.status(404).json({ errors: 'No response found with id: ${req.params.id}'});
      })
      .catch(errors => { res.status(500).json({ errors }); });
  })
  .put([check('id').isMongoId()], oneOf([
    check('from').exists().isAscii().trim().escape(),
    check('subject').exists().isAscii().trim().escape(),
    check('text').exists().isAscii().trim().escape(),
    check('recipients').exists(),
    check('is_html').exists(),
    ]), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    const { from, subject, text, recipients, is_sent, sent_on, is_html } = req.body;
    Email.findById(req.params.id)
      .then(response => {
        if (!response) {
          res.status(404).json({ errors: errors.mapped() });
        } else {
           response.from = from || response.from;
          response.subject = subject || response.subject;
          response.text = text || response.text;
          response.recipients = recipients || response.recipients;
          response.is_sent = is_sent || response.is_sent;
          response.sent_on = sent_on || response.sent_on;
          response.is_html = is_html || response.is_html;
          response.save();
          res.status(200).json({ response });
        }
      })
      .catch(({ errors }) => res.status(500).json({ errors }));
  })
  .delete([check('id').isMongoId()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.mapped() });
    }
    Email.findByIdAndRemove(req.params.id)
      .then(removed => {
        removed
          ? res.status(200).json({removed})
          : res.status(404).json({errors: "No response found with id: ${req.params.id}"});
      })
      .catch(errors => { res.status(500).json({errors})});
  });

module.exports = router;