import Rule from './Rule';
import ProductionBuilder from '../ProductionBuilder';

export default class BasicCodeBlock extends Rule {
  constructor(context) {
    super(/^((?:\r?\n)?(?: {4}|\t).*)+/, context);
  }

  code() {
    return this._deindent(this.match[0]);
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

  _deindent(list) {
    const items = list.split(/\r?\n/);
    if(items[0].length === 0)
      items.shift();

    const indentLength = items[0][0] === ' ' ? 4 : 1;

    return items.map(item =>
      item.substring(indentLength, item.length)
    ).join('\n');
  }
}