import Rule from './Rule';
import Parser from '../Parser';
import ListItem from './ListItem';
import Ignore from './Ignore';
import ProductionBuilder from '../ProductionBuilder';

export default class UnorderedList extends Rule {
  constructor(context) {
    super(/^(?:\*|\+|-)[ \t]+.*(?:\r?\n[ \t][ \t].*|\r?\n(?:\*|\+|-)[ \t]+.*)*/, context);
  }

  text() {
    return this.match[0];
  }

  produce() {
    return new ProductionBuilder()
      .component('ul')
      .children(new Parser([ ListItem, Ignore ], this.context).parse(this.text()))
      .build();
  }
}