import Rule from './Rule';
import ProductionBuilder from '../ProductionBuilder';

export default class Strikethrough extends Rule {
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
}