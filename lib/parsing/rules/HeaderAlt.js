const Rule = require('./Rule');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class Header extends Rule {
  constructor(context) {
    super(/^([^\s].*)\r?\n(===+|---+)/, context);
  }

  level() {
    return this.match[2][0] === '=' ? '1' : '2';
  }

  text() {
    return this.match[1];
  }

  produce() {
    return new ProductionBuilder()
      .component(`h${this.level()}`)
      .children(this.context.asInline.parse(this.text()))
      .build();
  }
};