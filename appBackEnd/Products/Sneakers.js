var Products = require('./Products');

class Sneakers extends Products {
  getName() {
    return 'Sneakers: ' + this.name;
  }


  getSection() {
    return 4;
  }

}

module.exports = Sneakers;

