import Ignore from '../../../src/parsing/rules/Ignore';
import Context from '../../util/MockContext';

describe('Ignore Rule', () => {
  let rule;
  let context;

  beforeEach(() => {
    context = new Context();
    rule = new Ignore(context);
  });

  describe('matches', () => {
    it('should match any character', () => {
      expect(rule.matches('$')).toBeTruthy();
      expect(rule.matches('a')).toBeTruthy();
      expect(rule.matches('1')).toBeTruthy();
    });

    it('should match whitespace', () => {
      expect(rule.matches(' ')).toBeTruthy();
      expect(rule.matches('\t')).toBeTruthy();
      expect(rule.matches('\n')).toBeTruthy();
      expect(rule.matches('\r')).toBeTruthy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      expect(rule.produce()).toBe(null);
    });
  });
});