const HorizontalRule = require('../../lib/rules/HorizontalRule');
const Context = require('../util/MockContext');

describe('HorizontalRule Rule', () => {
  let rule;
  let context;

  beforeEach(() => {
    context = new Context();
    rule = new HorizontalRule(context);
  });

  describe('matches', () => {
    it('should match at least three hyphens', () => {
      expect(rule.matches('---')).toBeTruthy();
      expect(rule.matches('----')).toBeTruthy();
    });

    it('should match at least three asterisks', () => {
      expect(rule.matches('***')).toBeTruthy();
      expect(rule.matches('****')).toBeTruthy();
    });

    it('should match at least three underscores', () => {
      expect(rule.matches('___')).toBeTruthy();
      expect(rule.matches('____')).toBeTruthy();
    });
    
    it('should not match when non-matching characters are on the same line', () => {
      expect(rule.matches('-*_')).toBeFalsy();
      expect(rule.matches('---*')).toBeFalsy();
      expect(rule.matches('****g')).toBeFalsy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('Ordinary text')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('---');
      
      expect(rule.produce()).toEqual({
        c: 'hr'
      });
    });
  });
});