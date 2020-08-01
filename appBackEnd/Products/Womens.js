var Products = require('./Products');

class Womens extends Products {
  getName() {
    return 'Womens: ' + this.name;
  }


  getSection() {
    return 5;
  }

}

module.exports = Womens;

