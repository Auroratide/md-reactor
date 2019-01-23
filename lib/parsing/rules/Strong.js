const Rule = require('./Rule');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class Strong extends Rule {
  constructor(context) {
    super(/^(?:\*\*(.*?)\*\*|__(.*?)__)/, context);
  }

  text() {
    return this.match[1] || this.match[2];
  }

  produce() {
    return new ProductionBuilder()
      .component('strong')
      .children(this.context.asInline.parse(this.text()))
      .build();
  }
};