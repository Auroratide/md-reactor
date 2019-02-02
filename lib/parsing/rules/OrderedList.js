import Rule from './Rule';
import Parser from '../Parser';
import ListItem from './ListItem';
import Ignore from './Ignore';
import ProductionBuilder from '../ProductionBuilder';

export default class OrderedList extends Rule {
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
}