import Rule from './Rule';
import ProductionBuilder from '../ProductionBuilder';

export default class Emphasis extends Rule {
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
}