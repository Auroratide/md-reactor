import Rule from './Rule';
import ProductionBuilder from '../ProductionBuilder';

export default class HighlightedCodeBlock extends Rule {
  constructor(context) {
    super(/^```([a-z0-9]*)\r?\n((?:(?!```).|\r?\n)*)\r?\n```/, context);
  }

  code() {
    return this.match[2];
  }

  language() {
    return this.match[1] === '' ? undefined : this.match[1];
  }

  produce() {
    return new ProductionBuilder()
      .component('SyntaxHighlighter')
      .children(this.code())
      .props({
        language: this.language()
      })
      .build();
  }
};