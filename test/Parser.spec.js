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

  it('should throw an error when text cannot be parsed', () => {
    const parser = new Parser([ A ]);
    
    expect(() => parser.parse('c')).toThrow();
  });

  describe('when there are matches', () => {
    it('should return an object production for a single match', () => {
      const parser = new Parser([ A, B ]);
      
      expect(parser.parse('a')).toEqual({
        c: 'a'
      });
      expect(parser.parse('b')).toEqual({
        c: 'b'
      });
    });

    it('should return an array of productions for multiple matches', () => {
      const parser = new Parser([ A, B ]);
      
      expect(parser.parse('aba')).toEqual([ {
        c: 'a'
      }, {
        c: 'b'
      }, {
        c: 'a'
      } ]);
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