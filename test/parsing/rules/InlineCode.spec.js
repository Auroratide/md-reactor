const InlineCode = require('../../../lib/parsing/rules/InlineCode');
const Context = require('../../util/MockContext');

describe('InlineCode Rule', () => {
  let rule;
  let context;

  beforeEach(() => {
    context = new Context();
    rule = new InlineCode(context);
  });

  describe('matches', () => {
    it('should match single backticks', () => {
      expect(rule.matches('`text`')).toBeTruthy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('Ordinary text')).toBeFalsy();
    });

    it('should not match unterminated backticks', () => {
      expect(rule.matches('`text')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('`text`');
      
      expect(rule.produce()).toEqual({
        c: 'code',
        d: 'text'
      });
    });

    it('should terminate at first end terminal', () => {
      rule.matches('`first code` and `second code`');
      
      expect(rule.produce()).toEqual({
        c: 'code',
        d: 'first code'
      });
    });
  });
});