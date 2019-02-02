import Strong from '../../../src/parsing/rules/Strong';
import Context from '../../util/MockContext';

describe('Strong Rule', () => {
  let rule;

  beforeEach(() => {
    rule = new Strong(new Context());
  });

  describe('matches', () => {
    it('should match double asterisks', () => {
      expect(rule.matches('**Bold**')).toBeTruthy();
    });

    it('should match double underscores', () => {
      expect(rule.matches('__Bold__')).toBeTruthy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('Not bold')).toBeFalsy();
    });

    it('should not match unterminated asterisks', () => {
      expect(rule.matches('**Not bold')).toBeFalsy();
    });

    it('should not match unterminated underscores', () => {
      expect(rule.matches('__Not bold')).toBeFalsy();
    });

    it('should not match single asterisks', () => {
      expect(rule.matches('*Not bold*')).toBeFalsy();
    });

    it('should not match single underscores', () => {
      expect(rule.matches('_Not bold_')).toBeFalsy();
    });

    it('should not match when terminals are not the same type', () => {
      expect(rule.matches('**Not bold__')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('**Bold**');
      
      expect(rule.produce()).toEqual({
        c: 'strong',
        d: 'Bold'
      });
    });

    it('should terminate at first end terminal', () => {
      rule.matches('**First bold** and **Second bold**');
      
      expect(rule.produce()).toEqual({
        c: 'strong',
        d: 'First bold'
      });

      rule.matches('__First bold__ and __Second bold__');
      
      expect(rule.produce()).toEqual({
        c: 'strong',
        d: 'First bold'
      });
    });
  });
});