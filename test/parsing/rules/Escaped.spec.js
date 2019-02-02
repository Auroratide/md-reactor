import Escaped from '../../../lib/parsing/rules/Escaped';
import Context from '../../util/MockContext';

describe('Escaped Rule', () => {
  let rule;

  beforeEach(() => {
    rule = new Escaped(new Context());
  });

  describe('matches', () => {
    it('should match backslash followed by a character', () => {
      expect(rule.matches('\\*')).toBeTruthy();
    });

    it('should not match only a backslash', () => {
      expect(rule.matches('\\')).toBeFalsy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('ordinary text')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('\\*');
      
      expect(rule.produce()).toEqual('*');
    });
  });
});