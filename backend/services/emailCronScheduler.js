// const cron = require('node-cron');
const mongoose = require('mongoose');
const Email = require('../models/email');
const EmailService = require('./emailService');
require('dotenv').config(); // load env vars

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
mongoose.Promise = global.Promise;

Email.find({is_sent: false})
  .then(emails => {
    for (let i = 0; i < emails.length; i++) {
      EmailService.sendEmail(emails[i])
        .then(data => {
          if (data.emailSent) {
            const query = {_id: emails[i]._id};
            Email.update(query, {
              is_sent: true,
              sent_on: Date.now()
            }, (err, affected, resp) => {
              console.log(err);
            });
          }
        });
    }
  });

