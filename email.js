const EmailService = require('./backend/services/emailService.js');
const Email = require('./backend/models/email.js');
// from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
// to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
// subject: 'Hello ✔', // Subject line
// text: 'Hello world?', // plain text body
// html: '<b>Hello world?</b>' // html body

const testEmail = new Email({
  from: '"Fred Foo 👻" <foo@blurdybloop.com>',
  subject: 'Hello ✔',
  text: '<b>Hello world?</b>',
  recipients: ["bar@blurdybloop.com", "baz@blurdybloop.com"],
  is_html: false
});

EmailService.sendEmail(testEmail);