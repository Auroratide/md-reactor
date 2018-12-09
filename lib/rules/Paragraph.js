const Rule = require('./Rule');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class Paragraph extends Rule {
  constructor() {
    super(/^([^\n\r]+)(\r?\n\r?\n)?/);
  }

  text() {
    return this.match[1];
  }

  produce() {
    return new ProductionBuilder()
      .component('p')
      .children(this.text())
      .build();
  }
};