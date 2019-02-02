import HeaderAlt from '../../../lib/parsing/rules/HeaderAlt';
import Context from '../../util/MockContext';

describe('HeaderAlt Rule', () => {
  let rule;
  let context;

  beforeEach(() => {
    context = new Context();
    rule = new HeaderAlt(context);
  });

  describe('matches', () => {
    it('should match double underline', () => {
      expect(rule.matches('h1-alt\n======')).toBeTruthy();
    });

    it('should match single underline', () => {
      expect(rule.matches('h2-alt\n------')).toBeTruthy();
    });

    it('should match a minimum of three underline characters', () => {
      expect(rule.matches('h1-alt\n===')).toBeTruthy();
      expect(rule.matches('h2-alt\n---')).toBeTruthy();
    });

    it('should not match less than three underline characters', () => {
      expect(rule.matches('h1-alt\n==')).toBeFalsy();
      expect(rule.matches('h2-alt\n--')).toBeFalsy();
    });

    it('should not match when a new line separates the text from the underline', () => {
      expect(rule.matches('h1\n\n======')).toBeFalsy();
      expect(rule.matches('h2\n\n------')).toBeFalsy();
    });

    it('should not match when there is no new line separating the text from the underline', () => {
      expect(rule.matches('h1======')).toBeFalsy();
      expect(rule.matches('h1------')).toBeFalsy();
    });

    it('should not match when there is no text above the underline', () => {
      expect(rule.matches('\n======')).toBeFalsy();
      expect(rule.matches('\n------')).toBeFalsy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('Not italic')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production for level 1 header', () => {
      rule.matches('h1-alt\n=====');
      
      expect(rule.produce()).toEqual({
        c: 'h1',
        d: 'h1-alt'
      });
    });

    it('should create production for level 2 header', () => {
      rule.matches('h2-alt\n---------');
      
      expect(rule.produce()).toEqual({
        c: 'h2',
        d: 'h2-alt'
      });
    });

    it('should parse the text as inline', () => {
      rule.matches('text\n========');
      rule.produce();

      expect(context.asInline.parse).toHaveBeenCalledWith('text');
    });
  });
});