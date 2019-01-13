const Rule = require('./Rule');
const Parser = require('../Parser');
const ListItem = require('./ListItem');
const Ignore = require('./Ignore');
const ProductionBuilder = require('../ProductionBuilder');

module.exports = class OrderedList extends Rule {
  constructor(context) {
    super(/^(\d+)(?:\.|\))[ \t]+.*(?:\r?\n[ \t][ \t].*|\r?\n\d+(?:\.|\))[ \t]+.*)*/, context);
  }

  text() {
    return this.match[0];
  }

  start() {
    return this.match[1];
  }

  produce() {
    const start = this.start();
    const builder = new ProductionBuilder()
      .component('ol')
      .children(new Parser([ ListItem, Ignore ], this.context).parse(this.text()));
    
    if(start !== '1')
      builder.props({ start });
    
    return builder.build();
  }
};