const firestore = require('../firestore');
var db = firestore.db;
var {COLLECTION_NAME} = require('../utils');


class Product {
  id = 0;
  price = 0;
  name = '';
  discountPercent = 0;
  section = 0;
  count = 0;


  constructor(id = 0, name = '', price = 0, section = 0, count = 0) {
    this.id = id;
    this.name = name;
    this.section = section;
    this.count = count ;
    this.price = price;
  }

  getPrice() {
    return this.price;
  }

  getName() {
    return this.name;
  }

  getDiscount () {
    return this.discountPercent;
  }

  getSection () {
    return this.section;
  }

  getCount () {
    return this.count;
  }

  // setter
  setPrice(price) {
    this.price = price;
  }

  setName(name) {
    this.name = name;
  }

  setSection(section) {
    this.section = section;
  }

  setCount(count) {
    this.count = count;
  }

  // 

  getDiscountedPrice () {
    return this.price - (this.price * (this.discountPercent / 100));
  }

  setDiscountPercent(discountPercent = 0) {
    this.discountPercent = discountPercent;
  }

  getProduct (id = 0, callback) {
    var ref;
    // var response = new Promise();

    if (id == 0) {
      ref = db.collection(COLLECTION_NAME).get();
    }

    ref = db.collection(COLLECTION_NAME).get(id);

    ref.then(function (value) {
      console.log('get success');

      var products = [];

      value.forEach((doc) => {
        products.push({
          id: doc.id,
          data: doc.data()
        });
      });

      callback(products);

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

  save (callback) {
    var ref;

    var saveObj = { count: this.count, label: this.name, price: this.price, section: this.section }

    console.log(saveObj);

    var ref = db.collection(COLLECTION_NAME).add(saveObj);

    ref.then(function (value) {
      console.log('add success');

      callback(value);
    }).catch((reason) => {
        console.log('Handle rejected promise (' + reason + ') here.');
    });

    return ref;
  }
}

module.exports = Product;
