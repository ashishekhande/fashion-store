const firestore = require('../firestore');
var db = firestore.db;
var { COLLECTION_NAME_CUSTOMER } = require('../utils');

class Customer {
  mail = '';
  type = 'normal';
  subscription_segment = 0
  action = 'discount'

  constructor(mail = '', type = 'normal', subscription_segment = 0 ) {
    this.mail = mail;
    this.type = type;
    this.subscription_segment = subscription_segment;
  }

  setMail(mail) {
    this.mail = mail;
  }

  setType(type) {
    this.type = type;
  }

  setSegment(subscription_segment) {
    this.subscription_segment = subscription_segment
  }


  setAction(action) {
    this.action = action;
  }

  getMail() {
    return this.mail;
  }

  getType() {
   return this.type
  }

  getSegment() {
    return this.subscription_segment;
  }


  getAction() {
    return this.action;
  }


  addSubscriber (callback) {
    var ref;

    var saveObj = { Email: this.mail, action: this.action, subscription_segment: this.subscription_segment, type: this.type }

    console.log(saveObj);

    var ref = db.collection(COLLECTION_NAME_CUSTOMER).add(saveObj);

    ref.then(function (value) {
      console.log('add success');

      callback(value);
    }).catch((reason) => {
      console.log('Handle rejected promise (' + reason + ') here.');
    });

    return ref;
  }

  getCustomers(id, callback) {
    var ref;

    if (id == 0) {
      ref = db.collection(COLLECTION_NAME_CUSTOMER).get();
    }

    ref = db.collection(COLLECTION_NAME_CUSTOMER).get(id);

    ref.then(function (value) {
      console.log('get success');

      var customers = [];

      value.forEach((doc) => {
        customers.push({
          id: doc.id,
          data: doc.data()
        });
      });

      callback(customers);

    }).catch(
      // Log the rejection reason
      (reason) => {
        console.log(
          'Handle rejected promise (' + JSON.stringify(reason, 1) + ') here.'
        );

        // response.reject(reason)
      });

    return ref;
  }

  update() {
    console.log(this.mail + 'notified');
  }
}

module.exports = Customer;
