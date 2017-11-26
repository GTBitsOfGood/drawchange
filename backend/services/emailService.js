'use strict';
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

// Local Imports & Constants
require('dotenv').config(); // load env vars

function sendEmail(email) {
  return new Promise((resolve, reject) => {
      // Sendgrid info for SMTP
    const options = {
      apiKey: process.env.SENDGRID_API_KEY
    };

      // Settings for testing with local smtp
      // const transporter = nodemailer.createTransport({
      //   // host: account.smtp.host,
      //   // port: account.smtp.port,
      //   // secure: account.smtp.secure,
      //   // host: process.env.SMTP_HOST,
      //   // port: process.env.SMTP_PORT,
      //   // secure: false, // true for 465, false for other ports
      // });

    const transporter = nodemailer.createTransport(nodemailerSendgrid(options));

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
}

function parseRecipientEmails(recipients) {
  return recipients.map(recipient => recipient.email);
}

module.exports = { sendEmail };
