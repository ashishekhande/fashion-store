var Customer = require('./Customer');
var MailBot = require('../../mail');

class NormalCustomer extends Customer {
  update(data) {
    var mail = new MailBot();
    mail.send(undefined, 'Discount', this.mail + 'you are eligible for discount on' + this.subscription_segment +'Following are details' + data)
    console.log(this.mail + ' notified with normal privileges');
  }
}

module.exports = NormalCustomer;
