const EmailService = require('../backend/services/emailService');
const Email = require('../backend/models/email');
const chai = require('chai');
// const chaiAsPromised = require('chai-as-promised');
const assert = chai.assert;

// chai.use(chaiAsPromised);

describe('Email Service Test Suite', () => {
  describe('Sending Emails...', () => {
    it('should send email and return promise with message ID', function() {
      this.timeout(5000);  // Increase time out because it takes time to send the email
      const testEmail = new Email({
        from: '"Fred Foo 👻" <foobazz@gmail.com>',
        subject: 'Hello ✔',
        text: '<b>Hello world?</b>',
        recipients: [{ email: "foobar@gmail.com" }, { email: "baz@blurdybloop.com" }],
        is_html: false
      });
      return EmailService.sendEmail(testEmail)
          .then( data => {
            assert.equal(data.emailSent, true);
          });
    });

    it('should throw error message for no recipients', (done) => {
      const testEmailNoRecipients = new Email({
        from: '"Fred Foo 👻" <foo@blurdybloop.com>',
        subject: 'Hello ✔',
        text: '<b>Hello world?</b>',
        is_html: false
      });

      EmailService.sendEmail(testEmailNoRecipients).catch((data) => {
        assert.equal(data.emailSent, false);
        done();
      });
    });
  });
});