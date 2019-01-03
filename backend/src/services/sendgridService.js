'use strict';

// npm imports
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const mustache = require('mustache');

// Local imports
const { SendEmailError } = require('../util/errors');

// Constants
const EMAIL_TEMPLATE_RELATIVE_LOCATION = '../templates/email/';

// Import templates and compile
const mustacheFileNameEntries = Object.entries({
  registered: 'registered.mustache',
  accepted: 'accepted.mustache',
  rejected: 'rejected.mustache'
});
const mustacheTemplateEntries = mustacheFileNameEntries.map(([emailType, fileName]) => {
  const filePath = path.resolve(__dirname, EMAIL_TEMPLATE_RELATIVE_LOCATION, fileName);
  const template = fs.readFileSync(filePath, 'utf8');
  return [emailType, template];
});
const mustacheTemplates = new Map(mustacheTemplateEntries); // Map of emailType -> template

// Sendgrid info for SMTP
const options = {
  apiKey: process.env.SENDGRID_API_KEY
};
const transporter = nodemailer.createTransport(nodemailerSendgrid(options));

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

  // Populate and render template
  const template = mustacheTemplates.get('registered');
  const html = mustache.render(template, user);

  // Send email synchronously (promise)
  return sendEmail(recipients, subject, html);
}

function sendApplicationRejected(user) {
  const recipients = [user.bio.email];
  const subject = 'Drawchange Volunteer Registration';

  // Populate and render template
  const template = mustacheTemplates.get('rejected');
  const html = mustache.render(template, user);

  // Send email synchronously (promise)
  return sendEmail(recipients, subject, html);
}

function sendApplicationAccepted(user) {
  const recipients = [user.bio.email];
  const subject = 'Drawchange Volunteer Registration';

  // Populate and render template
  const template = mustacheTemplates.get('accepted');
  const html = mustache.render(template, user);

  // Send email synchronously (promise)
  return sendEmail(recipients, subject, html);
}

module.exports = {
  sendApplicationConfirmation,
  sendApplicationRejected,
  sendApplicationAccepted
};
