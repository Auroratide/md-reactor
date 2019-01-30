const AutoLink = require('../../../lib/parsing/rules/AutoLink');
const Context = require('../../util/MockContext');

describe('AutoLink Rule', () => {
  let rule;
  let context;

  beforeEach(() => {
    context = new Context();
    rule = new AutoLink(context);
  });

  describe('matches', () => {
    it('should match https protocol', () => {
      expect(rule.matches('https://auroratide.com')).toBeTruthy();
    });

    it('should match http protocol', () => {
      expect(rule.matches('http://auroratide.com')).toBeTruthy();
    });

    it('should match ftp protocol', () => {
      expect(rule.matches('ftp://auroratide.com')).toBeTruthy();
    });

    it('should match unspecified protocol', () => {
      expect(rule.matches('//auroratide.com')).toBeTruthy();
    });

    it('should match link with a path', () => {
      expect(rule.matches('https://auroratide.com/posts')).toBeTruthy();
    });

    it('should match link with a hash', () => {
      expect(rule.matches('https://auroratide.com/posts#top')).toBeTruthy();
    });

    it('should not match lack of link identifier', () => {
      expect(rule.matches('auroratide.com')).toBeFalsy();
    });

    it('should not match lack of top level domain', () => {
      expect(rule.matches('https://auroratide')).toBeFalsy();
      expect(rule.matches('https://auroratide.')).toBeFalsy();
    });

    it('should not match lack of domain', () => {
      expect(rule.matches('https://')).toBeFalsy();
    });

    it('should not match unknown protocol', () => {
      expect(rule.matches('hello://auroratide.com')).toBeFalsy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('Ordinary text')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('https://auroratide.com');
      
      expect(rule.produce()).toEqual({
        c: 'a',
        p: {
          href: 'https://auroratide.com'
        },
        d: 'https://auroratide.com'
      });
    });

    it('should terminate at whitespace', () => {
      rule.matches('https://auroratide.com is a good website');
      
      expect(rule.produce()).toEqual({
        c: 'a',
        p: {
          href: 'https://auroratide.com'
        },
        d: 'https://auroratide.com'
      });
    });

    it('should terminate at any non-url character', () => {
      rule.matches('https://auroratide.com,');
      
      expect(rule.produce()).toEqual({
        c: 'a',
        p: {
          href: 'https://auroratide.com'
        },
        d: 'https://auroratide.com'
      });
    });
  });
});