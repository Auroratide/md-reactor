import Rule from './Rule';
import ProductionBuilder from '../ProductionBuilder';

export default class Header extends Rule {
  constructor(context) {
    super(/^(#{1,6})\s*(.*)/, context);
  }

  level() {
    return this.match[1].length;
  }

  text() {
    return this.match[2];
  }

  produce() {
    return new ProductionBuilder()
      .component(`h${this.level()}`)
      .children(this.context.asInline.parse(this.text()))
      .build();
  }
}