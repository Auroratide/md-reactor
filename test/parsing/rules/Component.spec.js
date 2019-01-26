import Component from '../../../lib/parsing/rules/Component';
import Context from '../../util/MockContext';

describe('Component Rule', () => {
  let rule;
  let context;

  beforeEach(() => {
    context = new Context();
    rule = new Component(context);
  });

  describe('matches', () => {
    it('should match self-ending components', () => {
      expect(rule.matches('<MyComponent />')).toBeTruthy();
    });

    it('should match components with an end tag', () => {
      expect(rule.matches('<MyComponent></MyComponent>')).toBeTruthy();
    });

    it('should match components with attributes', () => {
      expect(rule.matches('<MyComponent prop="value" />')).toBeTruthy();
    });

    it('should match components with children', () => {
      expect(rule.matches('<MyComponent>text</MyComponent>')).toBeTruthy();
    });

    it('should match across multiple lines', () => {
      expect(rule.matches('<MyComponent\n  prop="value />')).toBeTruthy();
      expect(rule.matches('<MyComponent>\n  text\n</MyComponent>')).toBeTruthy();
    });

    it('should match html elements', () => {
      expect(rule.matches('<hr />')).toBeTruthy();
      expect(rule.matches('<span>text</span>')).toBeTruthy();
    });

    it('should not match when end tag is missing', () => {
      expect(rule.matches('<MyComponent>')).toBeFalsy();
    });

    it('should not match when end tag is of a different name', () => {
      expect(rule.matches('<MyComponent></NotMyComponent>')).toBeFalsy();
    });

    it('should not match when component has an invalid name', () => {
      expect(rule.matches('<?BadName />')).toBeFalsy();
    });

    it('should not match when component has an empty name', () => {
      expect(rule.matches('</>')).toBeFalsy();
      expect(rule.matches('< />')).toBeFalsy();
      expect(rule.matches('<></>')).toBeFalsy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('Ordinary Text')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production for basic component', () => {
      rule.matches('<MyComponent />');
      
      expect(rule.produce()).toEqual({
        c: 'MyComponent',
      });
    });

    it('should create production for component with attributes', () => {
      rule.matches('<MyComponent id="1" prop="value" />');
      
      expect(rule.produce()).toEqual({
        c: 'MyComponent',
        p: {
          id: '1',
          prop: 'value'
        }
      });
    });

    it('should create production for component with children', () => {
      rule.matches('<MyComponent>text</MyComponent>');
      
      expect(rule.produce()).toEqual({
        c: 'MyComponent',
        d: 'text'
      });
    });

    it('should collapse whitespace in children', () => {
      rule.matches('<MyComponent>text    text</MyComponent>');
      
      expect(rule.produce()).toEqual({
        c: 'MyComponent',
        d: 'text text'
      });
    });

    it('should produce nested components', () => {
      rule.matches('<MyComponent>\n  <p>\n    text\n  </p>\n</MyComponent>');

      expect(rule.produce()).toEqual({
        c: 'MyComponent',
        d: {
          c: 'p',
          d: 'text'
        }
      });
    });
  });
});