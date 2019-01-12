const Rule = require('./Rule');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class Strikethrough extends Rule {
  constructor(context) {
    super(/^~~(.*?)~~/, context);
  }

  text() {
    return this.match[1];
  }

  produce() {
    return new ProductionBuilder()
      .component('del')
      .children(this.context.asInline.parse(this.text()))
      .build();
  }
};