'use strict';
const nodemailer = require('nodemailer');

// Local Imports & Constants
require('dotenv').config(); // load env vars

function sendEmail(email) {
  return new Promise((resolve, reject) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        // host: process.env.SMTP_HOST,
        // port: process.env.SMTP_PORT,
        // secure: false, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass  // generated ethereal password
        }
      });

    // setup email data with unicode symbols
      const mailOptions = {
        from: email.from, // sender address
        to: parseRecipientEmails(email.recipients), // list of receivers
        subject: email.subject, // Subject line
      // text: "<b> test </b>", // plain text body
        html: email.text // html body
      };

    // send mail with defined transport object
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          return reject({
            errorMessage: error,
            emailSent: false
          });
        }

        resolve({
          emailSent: true
        });
      });
    });
  });
}

function parseRecipientEmails(recipients) {
  return recipients.map(recipient => recipient.email);
}

module.exports = { sendEmail };
