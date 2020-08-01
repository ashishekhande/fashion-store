var Hat = require('./Hat');
var Jackets = require('./Jackets');
var Mens = require('./Mens');
var Womens = require('./Womens');
var Sneakers = require('./Sneakers');

class ProductsFactory {
  constructor() { }

  getProduct(section) {
    switch (section) {
      case '1':

        return new Hat();
        break;

      case '2':

        return new Jackets();
        break;

      case '3':

        return new Mens();
        break;

      case '4':

        return new Sneakers();
        break;


      case '5':

        return new Womens();
        break;

      default:
        return null;
        break;
    }

  }
}

module.exports = ProductsFactory;
