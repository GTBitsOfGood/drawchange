// npm imports
const Mailchimp = require('mailchimp-api-v3');

// Local imports
const { SubscribeUserError } = require('../util/errors');

// Constants
const SUBSCRIBER_LIST_ID = process.env.MAILCHIMP_SUBSCRIBER_LIST_ID;
const SUBSCRIBER_LIST_API_PATH = `/lists/${SUBSCRIBER_LIST_ID}/members/`;

// Initialize
const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);

/**
 * Adds an email to the preset subscriber list.
 *
 * @param firstName user's first name
 * @param lastName user's last name
 * @param email the email to add to the list (user's email)
 * @returns a promise
 */
function addSubscriber(firstName, lastName, email) {
  return mailchimp
    .post(SUBSCRIBER_LIST_API_PATH, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    })
    .then(() => {
      // Ignore result, it was successful. Do not pass result to caller (abstraction)
      return Promise.resolve();
    })
    .catch(err => {
      if (err.status === 400 && err.title === 'Member Exists') {
        // Catch `already subscribed` error and ignore
        console.log(`${email} is already a member of list ${SUBSCRIBER_LIST_ID}`);
        return Promise.resolve();
      }

      // Encapsulate error for caller
      return Promise.reject(new SubscribeUserError(err));
    });
}

module.exports = {
  addSubscriber
};
