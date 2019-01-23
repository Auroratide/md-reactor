const Paragraph = require('../../../lib/parsing/rules/Paragraph');
const Context = require('../../util/MockContext');

describe('Paragraph Rule', () => {
  let rule;
  let context;
  let parser;

  beforeEach(() => {
    context = new Context();
    rule = new Paragraph(context);
  });

  describe('matches', () => {
    it('should match paragraphs', () => {
      expect(rule.matches('Some text')).toBeTruthy();
    });

    it('should not match new lines', () => {
      expect(rule.matches('\n')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('Some text');
      
      expect(rule.produce()).toEqual({
        c: 'p',
        d: 'Some text'
      });

      expect(context.asInline.parse).toHaveBeenCalledWith('Some text');
    });
  });
});