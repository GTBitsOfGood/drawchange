'use strict';

// npm imports
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

// Local imports
const { SendEmailError } = require('../util/errors');

// Sendgrid info for SMTP
const options = {
  apiKey: process.env.SENDGRID_API_KEY
};
const transporter = nodemailer.createTransport(
  nodemailerSendgrid(options)
);

function sendEmail(recipients, subject, html) {
  return new Promise((resolve, reject) => {

    // setup email data with unicode symbols
    const mailOptions = {
      from: process.env.SENDGRID_FROM_EMAIL,
      to: recipients,
      subject: subject,
      html: html
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, error => {
      if (error) {
        return reject(new SendEmailError(error));
      }

      return resolve();
    });

  });
}

function sendApplicationConfirmation(user) {
  const recipients = [user.bio.email];
  const subject = 'Drawchange Volunteer Registration';
  const html = `<h1> Application Submitted Confirmation </h1>`;

  // Send email synchronously (promise)
  return sendEmail(recipients, subject, html);
}

function sendApplicationRejected(user) {
  const recipients = [user.bio.email];
  const subject = 'Drawchange Volunteer Registration';
  const html = `<h1> Application Submitted Rejected </h1>`;

  // Send email synchronously (promise)
  return sendEmail(recipients, subject, html);
}

function sendApplicationAccepted(user) {
  const recipients = [user.bio.email];
  const subject = 'Drawchange Volunteer Registration';
  const html = `<h1> Application Submitted Accepted as a ${user.bio.role} </h1>`;

  // Send email synchronously (promise)
  return sendEmail(recipients, subject, html);
}

module.exports = {
  sendApplicationConfirmation,
  sendApplicationRejected,
  sendApplicationAccepted
};
