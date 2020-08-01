var nodemailer = require('nodemailer');

class MailBot {
  // transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'bhagawatdongre@gmail.com',
  //     pass: '9850428354oo'
  //   }
  // });
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'bhagawatdongre@gmail.com',
        pass: '9850428354oo'
    }
  });

  mailOptions = {
    from: 'bhagawatdongre@gmail.com',
    to: 'bhagawatdongre@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  send(to = 'bhagawatdongre@gmail.com', subject = 'Sending Email using Node.js', text = 'That was easy!') {
    this.mailOptions.to = to;
    this.mailOptions.subject = subject;
    this.mailOptions.text = text;

    this.transporter.sendMail(this.mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}

module.exports = MailBot;
