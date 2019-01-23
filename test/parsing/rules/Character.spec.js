const Character = require('../../../lib/parsing/rules/Character');

describe('Character Rule', () => {
  let rule;

  beforeEach(() => {
    rule = new Character();
  });

  describe('matches', () => {
    it('should match any character', () => {
      expect(rule.matches('$')).toBeTruthy();
      expect(rule.matches(' ')).toBeTruthy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('t');
      
      expect(rule.produce()).toEqual('t');
    });
  });
});