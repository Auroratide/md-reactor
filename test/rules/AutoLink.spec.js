const AutoLink = require('../../lib/rules/AutoLink');
const Context = require('../util/MockContext');

describe('AutoLink Rule', () => {
  let rule;
  let context;

  beforeEach(() => {
    context = new Context();
    rule = new AutoLink(context);
  });

  describe('matches', () => {
    it('should match https within angle brackets', () => {
      expect(rule.matches('<https://auroratide.com>')).toBeTruthy();
    });

    it('should match http within angle brackets', () => {
      expect(rule.matches('<http://auroratide.com>')).toBeTruthy();
    });

    it('should match unspecificed protocol within angle brackets', () => {
      expect(rule.matches('<//auroratide.com>')).toBeTruthy();
    });

    it('should not match unmatched angle brackets', () => {
      expect(rule.matches('<https://auroratide.com')).toBeFalsy();
    });

    it('should not match a non-url', () => {
      expect(rule.matches('<text>')).toBeFalsy();
    });

    it('should not match unknown protocol', () => {
      expect(rule.matches('<hello://auroratide.com>')).toBeFalsy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('Ordinary text')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('<https://auroratide.com>');
      
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