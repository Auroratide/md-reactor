import path from 'path';
import fs from 'fs';
import { Parser, Rule, ProductionBuilder } from '../../lib/parsing';

describe('md-reactor parser', () => {
  it('should parse markdown', () => {
    const content = fs.readFileSync(path.join(__dirname, '..', 'example.md'), 'utf-8');
    const expected = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'example.json'), 'utf-8'));

    expect(Parser
      .withBlockRules([Infobox])
      .withInlineRules([Sup])
      .parse(content)).toEqual(expected);
  });
});

class Infobox extends Rule {
  constructor(context) {
    super(/^,,,\r?\n((?:.|\r?\n)*)\r?\n,,,/, context);
  }

  text() {
    return this.match[1];
  }

  produce() {
    return new ProductionBuilder()
      .component('div')
      .props({
        className: 'infobox'
      })
      .children(this.context.asBlock.parse(this.text()))
      .build();
  }
}

class Sup extends Rule {
  constructor(context) {
    super(/^\^\^(.*?)\^\^/, context);
  }

  text() {
    return this.match[1];
  }

  produce() {
    return new ProductionBuilder()
      .component('sup')
      .children(this.context.asInline.parse(this.text()))
      .build();
  }
}