var Products = require('./Products');

class Hat extends Products {
  getName() {
    return 'Hat: '+ this.name;
  }

  getSection() {
    return 1;
  }

}

module.exports = Hat;

