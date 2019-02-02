import Rule from './Rule';
import ProductionBuilder from '../ProductionBuilder';

export default class Strong extends Rule {
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
}