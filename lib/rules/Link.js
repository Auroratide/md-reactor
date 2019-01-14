const Rule = require('./Rule');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class Link extends Rule {
  constructor(context) {
    super(/^\[(.*)\]\((.*)\)/, context);
  }

  text() {
    return this.match[1];
  }

  href() {
    return this.match[2];
  }

  produce() {
    return new ProductionBuilder()
      .component('a')
      .props({
        href: this.href()
      })
      .children(this.context.asInline.parse(this.text()))
      .build();
  }
};