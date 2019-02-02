import Strikethrough from '../../../src/parsing/rules/Strikethrough';
import Context from '../../util/MockContext';

describe('Strikethrough Rule', () => {
  let rule;
  let context;

  beforeEach(() => {
    context = new Context();
    rule = new Strikethrough(context);
  });

  describe('matches', () => {
    it('should match double tildes', () => {
      expect(rule.matches('~~Strikethrough~~')).toBeTruthy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('Not strikethrough')).toBeFalsy();
    });

    it('should not match unterminated tildes', () => {
      expect(rule.matches('~~Not strikethrough')).toBeFalsy();
    });

    it('should not match single tildes', () => {
      expect(rule.matches('~Not strikethrough~')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('~~Strikethrough~~');
      
      expect(rule.produce()).toEqual({
        c: 'del',
        d: 'Strikethrough'
      });
    });

    it('should terminate at first end terminal', () => {
      rule.matches('~~First strikethrough~~ and ~~Second strikethrough~~');
      
      expect(rule.produce()).toEqual({
        c: 'del',
        d: 'First strikethrough'
      });
    });

    it('should parse the text as inline', () => {
      rule.matches('~~text~~');
      rule.produce();

      expect(context.asInline.parse).toHaveBeenCalledWith('text');
    });
  });
});