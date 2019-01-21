const Rule = require('./Rule');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class InlineCode extends Rule {
  constructor(context) {
    super(/^`(.*?)`/, context);
  }

  text() {
    return this.match[1];
  }

  produce() {
    return new ProductionBuilder()
      .component('code')
      .children(this.text())
      .build();
  }
};