const Rule = require('./Rule');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class Emphasis extends Rule {
  constructor(context) {
    super(/^(?:\*(.*?)\*|_(.*?)_)/, context);
  }

  text() {
    return this.match[1] || this.match[2];
  }

  produce() {
    return new ProductionBuilder()
      .component('em')
      .children(this.context.asInline.parse(this.text()))
      .build();
  }
};