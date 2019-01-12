const Header = require('../../lib/rules/Header');
const Context = require('../util/MockContext');

describe('Header Rule', () => {
  let rule;
  let context;

  beforeEach(() => {
    context = new Context();
    rule = new Header(context);
  });

  describe('matches', () => {
    it('should match single hash', () => {
      expect(rule.matches('# h1')).toBeTruthy();
    });

    it('should match double hash', () => {
      expect(rule.matches('## h2')).toBeTruthy();
    });

    it('should match triple hash', () => {
      expect(rule.matches('### h3')).toBeTruthy();
    });

    it('should match quadruple hash', () => {
      expect(rule.matches('#### h4')).toBeTruthy();
    });

    it('should match quintuple hash', () => {
      expect(rule.matches('##### h5')).toBeTruthy();
    });

    it('should match sextuple hash', () => {
      expect(rule.matches('###### h6')).toBeTruthy();
    });

    it('should match when there are no spaces between the hashes and the text', () => {
      expect(rule.matches('#h1')).toBeTruthy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('Not italic')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production for level 1 header', () => {
      rule.matches('# h1');
      
      expect(rule.produce()).toEqual({
        c: 'h1',
        d: 'h1'
      });
    });

    it('should create production for level 2 header', () => {
      rule.matches('## h2');
      
      expect(rule.produce()).toEqual({
        c: 'h2',
        d: 'h2'
      });
    });

    it('should create production for level 3 header', () => {
      rule.matches('### h3');
      
      expect(rule.produce()).toEqual({
        c: 'h3',
        d: 'h3'
      });
    });

    it('should create production for level 4 header', () => {
      rule.matches('#### h4');
      
      expect(rule.produce()).toEqual({
        c: 'h4',
        d: 'h4'
      });
    });

    it('should create production for level 5 header', () => {
      rule.matches('##### h5');
      
      expect(rule.produce()).toEqual({
        c: 'h5',
        d: 'h5'
      });
    });

    it('should create production for level 6 header', () => {
      rule.matches('###### h6');
      
      expect(rule.produce()).toEqual({
        c: 'h6',
        d: 'h6'
      });
    });

    it('should parse the text as inline', () => {
      rule.matches('# text');
      rule.produce();

      expect(context.asInline.parse).toHaveBeenCalledWith('text');
    });
  });
});