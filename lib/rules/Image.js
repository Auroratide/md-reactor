const Rule = require('./Rule');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class Image extends Rule {
  constructor(context) {
    super(/^!\[(.*?)\]\((.*?)(?:\s+"(.*?)")?\)/, context);
  }

  alt() {
    return this.match[1];
  }

  src() {
    return this.match[2];
  }

  title() {
    return this.match[3];
  }

  produce() {
    return new ProductionBuilder()
      .component('img')
      .props({
        src: this.src(),
        alt: this.alt(),
        title: this.title()
      })
      .build();
  }
};