const Image = require('../../lib/rules/Image');
const Context = require('../util/MockContext');

describe('Image Rule', () => {
  let rule;
  let context;

  beforeEach(() => {
    context = new Context();
    rule = new Image(context);
  });

  describe('matches', () => {
    it('should match exclamation with bracket and parentheses', () => {
      expect(rule.matches('![Text](/link)')).toBeTruthy();
    });

    it('should not match without exclamation', () => {
      expect(rule.matches('[Text](/link)')).toBeFalsy();
    });

    it('should not match only brackets', () => {
      expect(rule.matches('![Text]')).toBeFalsy();
    });

    it('should not match only parens', () => {
      expect(rule.matches('!(Text)')).toBeFalsy();
    });

    it('should not match when content exists between the brackets and the parens', () => {
      expect(rule.matches('![Text].(/link)')).toBeFalsy();
    });

    it('should not match when content exists between the exclamation and brackets', () => {
      expect(rule.matches('!.[Text].(/link)')).toBeFalsy();
      expect(rule.matches('! [Text].(/link)')).toBeFalsy();
    });

    it('should not match when brackets are unmatched', () => {
      expect(rule.matches('![Text(/link)')).toBeFalsy();
    });

    it('should not match when parens are unmatched', () => {
      expect(rule.matches('![Text](/link')).toBeFalsy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('Ordinary text')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('![Text](/link)');
      
      expect(rule.produce()).toEqual({
        c: 'img',
        p: {
          src: '/link',
          alt: 'Text'
        }
      });
    });

    it('should represent quoted text as the title', () => {
      rule.matches('![Text](/link "title")');
      
      expect(rule.produce()).toEqual({
        c: 'img',
        p: {
          src: '/link',
          alt: 'Text',
          title: 'title'
        }
      });
    });

    it('should parse the first image in a series of images', () => {
      rule.matches('![Text](/link) some text ![T](/l)');
      
      expect(rule.produce()).toEqual({
        c: 'img',
        p: {
          src: '/link',
          alt: 'Text'
        }
      });
    });
  });
});