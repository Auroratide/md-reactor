const Rule = require('./Rule');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class Link extends Rule {
  constructor(context) {
    super(/^<((?:https?:)?\/\/.*?)>/, context);
  }

  href() {
    return this.match[1];
  }

  produce() {
    return new ProductionBuilder()
      .component('a')
      .props({
        href: this.href()
      })
      .children(this.href())
      .build();
  }
};