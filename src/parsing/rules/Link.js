import Rule from './Rule';
import ProductionBuilder from '../ProductionBuilder';

export default class Link extends Rule {
  constructor(context) {
    super(/^\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)/, context);
  }

  text() {
    return this.match[1];
  }

  href() {
    return this.match[2];
  }

  title() {
    return this.match[3];
  }

  produce() {
    return new ProductionBuilder()
      .component('a')
      .props({
        href: this.href(),
        title: this.title()
      })
      .children(this.context.asInline.parse(this.text()))
      .build();
  }
}