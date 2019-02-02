import Rule from './Rule';
import ProductionBuilder from '../ProductionBuilder';

export default class InlineCode extends Rule {
  constructor(context) {
    super(/^`(.*?)`/, context);
  }

  text() {
    return this.match[1];
  }

  produce() {
    return new ProductionBuilder()
      .component('code')
      .children(this.text())
      .build();
  }
}