import Rule from './Rule';
import ProductionBuilder from '../ProductionBuilder';

export default class Link extends Rule {
  constructor(context) {
    super(/^(?:https?:|ftp:)?\/\/[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/, context);
  }

  href() {
    return this.match[0];
  }

  produce() {
    return new ProductionBuilder()
      .component('a')
      .props({
        href: this.href()
      })
      .children(this.href())
      .build();
  }
};