const Rule = require('./Rule');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class CodeBlock extends Rule {
  constructor(context) {
    super(/^```\r?\n((?:(?!```).|\r?\n)*)\r?\n```/, context);
  }

  code() {
    return this.match[1];
  }

  produce() {
    return new ProductionBuilder()
      .component('pre')
      .children(new ProductionBuilder()
        .component('code')
        .children(this.code())
        .build())
      .build();
  }
};