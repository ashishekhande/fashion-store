var Customer = require('./Customer');
var MailBot = require('../../mail');

class PremiumCustomer extends Customer {

  update(data) {
    var mail = new MailBot();
    mail.send(undefined, 'Discount premium privileges', this.mail + 'you are eligible for discount on' + this.subscription_segment + 'Following are details' + data + '10% more from us as your premium customer')
    console.log(this.mail + ' notified with premium privileges');
  }

}

module.exports = PremiumCustomer;
