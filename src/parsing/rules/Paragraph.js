import Rule from './Rule';
import ProductionBuilder from '../ProductionBuilder';

export default class Paragraph extends Rule {
  constructor(context) {
    super(/^([^\n\r]+)(\r?\n\r?\n)?/, context);
  }

  text() {
    return this.match[1];
  }

  produce() {
    return new ProductionBuilder()
      .component('p')
      .children(this.context.asInline.parse(this.text()))
      .build();
  }
}