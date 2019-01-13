const Rule = require('./Rule');
const Parser = require('../Parser');
const ListItem = require('./ListItem');
const Ignore = require('./Ignore');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class UnorderedList extends Rule {
  constructor(context) {
    super(/^(?:\*|\+|-)[ \t]+.*(?:\r?\n[ \t][ \t].*|\r?\n(?:\*|\+|-)[ \t]+.*)*/, context);
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