import Rule from './Rule';
import ProductionBuilder from '../ProductionBuilder';

export default class LanguageCodeBlock extends Rule {
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
    const className = this.language() ? `language-${this.language()}` : undefined;
    return new ProductionBuilder()
      .component('pre')
      .children(new ProductionBuilder()
        .component('code')
        .children(this.code())
        .props({ className })
        .build()
      )
      .build();
  }
}