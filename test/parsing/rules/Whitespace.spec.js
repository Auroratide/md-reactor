import Whitespace from '../../../lib/parsing/rules/Whitespace';

describe('Whitespace Rule', () => {
  let rule;

  beforeEach(() => {
    rule = new Whitespace();
  });

  describe('matches', () => {
    it('should match whitespace', () => {
      expect(rule.matches(' ')).toBeTruthy();
      expect(rule.matches('\t')).toBeTruthy();
      expect(rule.matches('\r')).toBeTruthy();
      expect(rule.matches('\n')).toBeTruthy();
    });

    it('should not match non-whitespace', () => {
      expect(rule.matches('a')).toBeFalsy();
      expect(rule.matches('.')).toBeFalsy();
      expect(rule.matches('3')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches(' ');
      
      expect(rule.produce()).toEqual(' ');
    });

    it('should collapse whitespace to a single space', () => {
      rule.matches('   \r\n  \t   ');
      
      expect(rule.produce()).toEqual(' ');
    });

    it('should return empty string when first whitespace is a new line', () => {
      rule.matches('\n ');
      
      expect(rule.produce()).toEqual('');
    });
  });
});