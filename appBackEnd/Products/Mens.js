var Products = require('./Products');

class Mens extends Products {
  getName() {
    return 'Mens: ' + this.name;
  }


  getSection() {
    return 3;
  }

}

module.exports = Mens;

