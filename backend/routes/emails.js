// NPM Packages
const express = require('express');
const router = express.Router();

// Local Imports
const Email = require('../models/email');


router.route('/')
  .get((req, res) => {
    Email.find()
      .then(emails => res.status(200).json({ emails }))
      .catch(({ errors }) => res.status(500).json({ errors }));
  })
  .post((req, res) => {
    const { from, subject, text, recipients, is_sent, sent_on, is_html } = req.body;
    const newEmail = new Email({ from, subject, text, recipients, is_sent, sent_on, is_html });
    newEmail.save()
      .then(email => res.status(200).json({ email }))
      .catch((errors) => { res.status(500).json({ errors });});
  });

router.route('/:id')
  .get((req, res) => {
    Email.findById(req.params.id)
      .then(response => {
        response
          ? res.status(200).json({ response })
          : res.status(404).json({ Error: 'No response found with id: ${req.params.id}'});
      })
      .catch(errors => { res.status(500).json({ errors }); });
  })
  .put((req, res) => {
    const { from, subject, text, recipients, is_sent, sent_on, is_html } = req.body;
    Email.findById(req.params.id)
      .then(response => {
        response.from = from || response.from;
        response.subject = subject || response.subject;
        response.text = text || response.text;
        response.recipients = recipients || response.recipients;
        response.is_sent = is_sent || response.is_sent;
        response.sent_on = sent_on || response.sent_on;
        response.is_html = is_html || response.is_html;
        response.save();
        res.status(200).json({ response });
      })
      .catch(({ errors }) => res.status(500).json({ errors }));
  })
  .delete((req, res) => {
    Email.findByIdAndRemove(req.params.id)
      .then(removed => {
        removed
              ? res.status(200).json({removed})
              : res.status(404).json({Error: "No response found with id: ${req.params.id}"});
      })
      .catch(errors => { res.status(500).json({errors});});
  });

module.exports = router;