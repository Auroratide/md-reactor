const Rule = require('./Rule');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class ListItem extends Rule {
  constructor(context) {
    super(/^(?:\*|\+|-)\s+(.*)/, context);
  }

  text() {
    return this.match[1];
  }

  produce() {
    return new ProductionBuilder()
      .component('li')
      .children(this.context.asInline.parse(this.text()))
      .build();
  }
};