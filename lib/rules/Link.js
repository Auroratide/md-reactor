const Rule = require('./Rule');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class Link extends Rule {
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
};