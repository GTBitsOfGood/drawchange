const EmailService = require('../backend/services/emailService');
const Email = require('../backend/models/email');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const assert = require('chai').assert;

chai.use(chaiAsPromised);

describe('Email Service Test Suite', () => {
  describe('Sending Emails...', () => {
    it('should send email and return promise with message ID', function() {
      this.timeout(10000); // Increase time out because it takes time to send the email
      const testEmail = new Email({
        from: '"Fred Foo 👻" <foo@blurdybloop.com>',
        subject: 'Hello ✔',
        text: '<b>Hello world?</b>',
        recipients: ["bar@blurdybloop.com", "baz@blurdybloop.com"],
        is_html: false
      });

      return assert.isFulfilled(EmailService.sendEmail(testEmail));
    });

    it('should throw error message for no recipients', function() {
      this.timeout(10000); // Increase time out because it takes time to send the email

      const testEmailNoRecipients = new Email({
        from: '"Fred Foo 👻" <foo@blurdybloop.com>',
        subject: 'Hello ✔',
        text: '<b>Hello world?</b>',
        is_html: false
      });

      return assert.isRejected(EmailService.sendEmail(testEmailNoRecipients));
    });
  });
});