const Rule = require('./Rule');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class ListItem extends Rule {
  constructor(context) {
    super(/^(?:\*|\+|-)\s+(.*)((?:\r?\n\s\s.*)*)/, context);
  }

  text() {
    return this.match[1] + this._deindent(this.match[2]);
  }

  produce() {
    const text = this.text();
    const children = text.includes('\n') ?
      this.context.asBlock.parse(text)   :
      this.context.asInline.parse(text);

    return new ProductionBuilder()
      .component('li')
      .children(children)
      .build();
  }

  _deindent(list) {
    const items = list.split(/\r?\n/);
    const indentLength = 2;

    return items.map(item =>
      item.substring(indentLength, item.length)
    ).join('\n');
  }
};