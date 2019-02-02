import Rule from './Rule';
import ProductionBuilder from '../ProductionBuilder';

export default class HorizontalRule extends Rule {
  constructor(context) {
    super(/^(?:---+|\*\*\*+|___+)(?!.)/, context);
  }
  produce() {
    return new ProductionBuilder()
      .component('hr')
      .build();
  }
};