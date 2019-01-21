const Rule = require('./Rule');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class UnorderedList extends Rule {
  constructor(context) {
    super(/^>\s(?:.|\r?\n>)*/, context);
  }

  text() {
    return this._stripPrefixes(this.match[0]);
  }

  produce() {
    return new ProductionBuilder()
      .component('blockquote')
      .children(this.context.asBlock.parse(this.text()))
      .build();
  }

  _stripPrefixes(text) {
    return text
      .split(/\r?\n/)
      .map(line => line.substring(2, line.length))
      .join('\n');
  }
};