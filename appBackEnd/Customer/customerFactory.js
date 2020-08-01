var PremiumCustomer = require('./premiumCustomer');
var NormalCustomer = require('./normalCustomer');

class CustomerFactory {
  constructor() {}

  getCustomer (type) {
    switch (type.toLowerCase()) {
      case 'premium' :

        return new PremiumCustomer();
        break;
         
      case 'normal':
        return new NormalCustomer();
      break;
      default :
      return null; 
      break; 
    }

  }
}

module.exports = CustomerFactory;
