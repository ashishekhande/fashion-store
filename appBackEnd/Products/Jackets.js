var Products = require('./Products');

class Jackets extends Products {
  getName() {
    return 'Jackets: ' + this.name;
  }


  getSection() {
    return 2;
  }

}

module.exports = Jackets;

