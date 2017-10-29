'use strict';
const nodemailer = require('nodemailer');

function sendEmail(email) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: '127.0.0.1',
      port: 25,
      secure: false, // true for 465, false for other ports
      // auth: {
      //   user: account.user, // generated ethereal user
      //   pass: account.pass  // generated ethereal password
      // }
    });

        // setup email data with unicode symbols
    const mailOptions = {
      from: email.from, // sender address
      to: email.recipients, // list of receivers
      subject: email.subject, // Subject line
      // text: "<b> test </b>", // plain text body
      html: email.text // html body
    };

        // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
}

module.exports = {sendEmail};
