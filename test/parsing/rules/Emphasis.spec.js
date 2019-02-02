import Emphasis from '../../../src/parsing/rules/Emphasis';
import Context from '../../util/MockContext';

describe('Emphasis Rule', () => {
  let rule;

  beforeEach(() => {
    rule = new Emphasis(new Context());
  });

  describe('matches', () => {
    it('should match single asterisks', () => {
      expect(rule.matches('*Italic*')).toBeTruthy();
    });

    it('should match single underscores', () => {
      expect(rule.matches('_Italic_')).toBeTruthy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('Not italic')).toBeFalsy();
    });

    it('should not match unterminated asterisks', () => {
      expect(rule.matches('*Not italic')).toBeFalsy();
    });

    it('should not match unterminated underscores', () => {
      expect(rule.matches('_Not italic')).toBeFalsy();
    });

    it('should not match when terminals are not the same type', () => {
      expect(rule.matches('*Not italic_')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('*Italic*');
      
      expect(rule.produce()).toEqual({
        c: 'em',
        d: 'Italic'
      });
    });

    it('should terminate at first end terminal', () => {
      rule.matches('*First italic* and *Second italic*');
      
      expect(rule.produce()).toEqual({
        c: 'em',
        d: 'First italic'
      });

      rule.matches('_First italic_ and _Second italic_');
      
      expect(rule.produce()).toEqual({
        c: 'em',
        d: 'First italic'
      });
    });
  });
});