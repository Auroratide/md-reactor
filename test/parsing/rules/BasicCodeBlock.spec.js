const BasicCodeBlock = require('../../../lib/parsing/rules/BasicCodeBlock');
const Context = require('../../util/MockContext');

describe('BasicCodeBlock Rule', () => {
  let rule;
  let context;

  beforeEach(() => {
    context = new Context();
    rule = new BasicCodeBlock(context);
  });

  describe('matches', () => {

    it('should match four spaces preceding non-whitespace', () => {
      expect(rule.matches('    code')).toBeTruthy();
    });

    it('should match a tab preceding non-whitespace', () => {
      expect(rule.matches('\tcode')).toBeTruthy();
    });

    it('should not match three spaces', () => {
      expect(rule.matches('   code')).toBeFalsy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('Not italic')).toBeFalsy();
    });
  
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('    text');
      
      expect(rule.produce()).toEqual({
        c: 'pre',
        d: {
          c: 'code',
          d: 'text'
        }
      });
    });

    it('should not include initial new line', () => {
      rule.matches('\n    text');
      
      expect(rule.produce()).toEqual({
        c: 'pre',
        d: {
          c: 'code',
          d: 'text'
        }
      });
    });

    it('should terminate at last line with preceeding spaces', () => {
      rule.matches('    text\n      text\n    text\n\ntext');
      
      expect(rule.produce()).toEqual({
        c: 'pre',
        d: {
          c: 'code',
          d: 'text\n  text\ntext'
        }
      });
    });
  });
});