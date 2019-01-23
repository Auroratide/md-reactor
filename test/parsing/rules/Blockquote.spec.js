const Blockquote = require('../../../lib/parsing/rules/Blockquote');
const Context = require('../../util/MockContext');

describe('Blockquote Rule', () => {
  let rule;
  let context;

  beforeEach(() => {
    context = new Context();
    rule = new Blockquote(context);
  });

  describe('matches', () => {
    it('should match lines preceded by a gt and a space', () => {
      expect(rule.matches('> quote')).toBeTruthy();
    });

    it('should not match when there is no space between the gt and the text', () => {
      expect(rule.matches('>quote')).toBeFalsy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('Ordinary Text')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('> quote');
      
      expect(rule.produce()).toEqual({
        c: 'blockquote',
        d: 'quote'
      });

      expect(context.asBlock.parse).toHaveBeenCalledWith('quote');
    });

    it('should continue the block quote for each line with a gt sign', () => {
      rule.matches('> quote\n>\n> more\n\nnot quote');
      
      expect(rule.produce()).toEqual({
        c: 'blockquote',
        d: 'quote\n\nmore'
      });

      expect(context.asBlock.parse).toHaveBeenCalledWith('quote\n\nmore');
    });
  });
});