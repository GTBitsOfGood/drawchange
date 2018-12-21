// NPM Packages
const express = require('express');
const { check, oneOf, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const router = express.Router();

const EmailHelper = require('../services/emailService');

// Local Imports
const Email = require('../models/email');

router.post(
  '/',
  [
    //TODO Add validations for recipients Array
    check('firstName').exists(),
    check('lastName')
      .exists()
      .isAscii()
      .trim()
      .escape(),
    check('email')
      .exists()
      .isAscii()
      .trim()
      .escape(),
    check('phoneNumber')
      .exists()
      .isAscii()
      .trim()
      .escape(),
    check('subject')
      .exists()
      .isAscii()
      .trim()
      .escape(),
    check('message').exists()
  ],
  (req, res) => {
    const errors = validationResult(req);
    console.log(matchedData(req, { locations: ['body'] }));
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    const emailData = matchedData(req);

    const formattedData = {
      from: emailData.email,
      recipients: [{ email: 'akhila@ballari.com' }],
      subject: emailData.subject,
      text: `Name: ${emailData.firstName} ${emailData.lastName}\n\nPhone: ${
        emailData.phoneNumber
      }\n\n${emailData.message}`
    };
    EmailHelper.sendEmail(formattedData)
      .then(() => {
        res.status(200).json({
          message: 'Email was sent!'
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({
          message: 'Email was not sent!'
        });
      });
  }
);

module.exports = router;
