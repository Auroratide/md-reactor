import Link from '../../../lib/parsing/rules/Link';
import Context from '../../util/MockContext';

describe('Link Rule', () => {
  let rule;
  let context;

  beforeEach(() => {
    context = new Context();
    rule = new Link(context);
  });

  describe('matches', () => {
    it('should match bracket with parentheses', () => {
      expect(rule.matches('[Text](/link)')).toBeTruthy();
    });

    it('should not match only brackets', () => {
      expect(rule.matches('[Text]')).toBeFalsy();
    });

    it('should not match only parens', () => {
      expect(rule.matches('(Text)')).toBeFalsy();
    });

    it('should not match when content exists between the brackets and the parens', () => {
      expect(rule.matches('[Text].(/link)')).toBeFalsy();
    });

    it('should not match when brackets are unmatched', () => {
      expect(rule.matches('[Text(/link)')).toBeFalsy();
    });

    it('should not match when parens are unmatched', () => {
      expect(rule.matches('[Text](/link')).toBeFalsy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('Ordinary text')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('[Text](/link)');
      
      expect(rule.produce()).toEqual({
        c: 'a',
        p: {
          href: '/link'
        },
        d: 'Text'
      });
    });

    it('should represent quoted text as the link title', () => {
      rule.matches('[Text](/link "title")');
      
      expect(rule.produce()).toEqual({
        c: 'a',
        p: {
          href: '/link',
          title: 'title'
        },
        d: 'Text'
      });
    });

    it('should parse the first link in a series of links', () => {
      rule.matches('[Text](/link) some text [T](/l)');
      
      expect(rule.produce()).toEqual({
        c: 'a',
        p: {
          href: '/link'
        },
        d: 'Text'
      });
    });

    it('should parse link-text as inline', () => {
      rule.matches('[Text](/link)');
      rule.produce();

      expect(context.asInline.parse).toHaveBeenCalledWith('Text');
    });
  });
});