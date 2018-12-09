const ProductionBuilder = require('../lib/ProductionBuilder');
const Rule = require('../lib/rules/Rule');
const Parser = require('../lib/Parser');

describe('Parser', () => {
  it('should return empty array when input is empty', () => {
    const parser = new Parser([ A ]);
    expect(parser.parse('')).toEqual([]);
    expect(parser.parse(null)).toEqual([]);
    expect(parser.parse(undefined)).toEqual([]);
  });

  it('should return an object production for a single match', () => {
    const parser = new Parser([ A, B ]);
    
    expect(parser.parse('a')).toEqual({
      c: 'a'
    });
    expect(parser.parse('b')).toEqual({
      c: 'b'
    });
  });

  class A extends Rule {
    constructor() {
      super(/^a/);
    }

    produce() {
      return new ProductionBuilder()
        .component('a').build();
    }
  }

  class B extends Rule {
    constructor() {
      super(/^b/);
    }

    produce() {
      return new ProductionBuilder()
        .component('b').build();
    }
  }
});