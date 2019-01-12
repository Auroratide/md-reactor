const Rule = require('./Rule');
const Parser = require('../Parser');
const ListItem = require('./ListItem');
const Ignore = require('./Ignore');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class Header extends Rule {
  constructor(context) {
    super(/^(?:\*|\+|-)\s+.*(?:\r?\n\s.*|\r?\n(?:\*|\+|-)\s+.*)*/, context);
  }

  text() {
    return this.match[0];
  }

  produce() {
    return new ProductionBuilder()
      .component('ul')
      .children(new Parser([ ListItem, Ignore ], this.context).parse(this.text()))
      .build();
  }
};