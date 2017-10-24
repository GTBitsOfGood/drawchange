const Email = require('./backend/services/emailService.js');

// from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
// to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
// subject: 'Hello ✔', // Subject line
// text: 'Hello world?', // plain text body
// html: '<b>Hello world?</b>' // html body

Email.sendEmail('"Fred Foo 👻" <foo@blurdybloop.com>', 'bar@blurdybloop.com, baz@blurdybloop.com', 'Hello ✔', '<bHello world?', 'This is a test');