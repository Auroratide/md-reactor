const Rule = require('./Rule');
const ProductionBuilder = require('../ProductionBuilder');
const Parser = require('../Parser');

module.exports = class Paragraph extends Rule {
  constructor(context) {
    super(/^([^\n\r]+)(\r?\n\r?\n)?/, context);
  }

  text() {
    return this.match[1];
  }

  produce() {
    return new ProductionBuilder()
      .component('p')
      .children(new Parser(this.context.inline()).parse(this.text()))
      .build();
  }
};