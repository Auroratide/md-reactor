const Rule = require('./Rule');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class HorizontalRule extends Rule {
  constructor(context) {
    super(/^(?:---+|\*\*\*+|___+)(?!.)/, context);
  }
  produce() {
    return new ProductionBuilder()
      .component('hr')
      .build();
  }
};