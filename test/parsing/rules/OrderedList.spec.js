import OrderedList from '../../../src/parsing/rules/OrderedList';
import Context from '../../util/MockContext';

describe('OrderedList Rule', () => {
  let rule;
  let context;

  beforeEach(() => {
    context = new Context();
    rule = new OrderedList(context);
  });

  describe('matches', () => {
    it('should match a number with a period', () => {
      expect(rule.matches('0. List')).toBeTruthy();
      expect(rule.matches('1. List')).toBeTruthy();
      expect(rule.matches('2. List')).toBeTruthy();
      expect(rule.matches('3. List')).toBeTruthy();
      expect(rule.matches('4. List')).toBeTruthy();
      expect(rule.matches('5. List')).toBeTruthy();
      expect(rule.matches('6. List')).toBeTruthy();
      expect(rule.matches('7. List')).toBeTruthy();
      expect(rule.matches('8. List')).toBeTruthy();
      expect(rule.matches('9. List')).toBeTruthy();
    });

    it('should match a number with a paren', () => {
      expect(rule.matches('0) List')).toBeTruthy();
      expect(rule.matches('1) List')).toBeTruthy();
      expect(rule.matches('2) List')).toBeTruthy();
      expect(rule.matches('3) List')).toBeTruthy();
      expect(rule.matches('4) List')).toBeTruthy();
      expect(rule.matches('5) List')).toBeTruthy();
      expect(rule.matches('6) List')).toBeTruthy();
      expect(rule.matches('7) List')).toBeTruthy();
      expect(rule.matches('8) List')).toBeTruthy();
      expect(rule.matches('9) List')).toBeTruthy();
    });

    it('should match a multi-digit number', () => {
      expect(rule.matches('12. List')).toBeTruthy();
      expect(rule.matches('234) List')).toBeTruthy();
    });

    it('should not match when there are no spaces between the list indicator and the text', () => {
      expect(rule.matches('1.List')).toBeFalsy();
      expect(rule.matches('1)List')).toBeFalsy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('Ordinary Text')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('1. List');
      
      expect(rule.produce()).toEqual({
        c: 'ol',
        d: {
          c: 'li',
          d: 'List'
        }
      });
    });

    it('should keep all list items in a single list', () => {
      rule.matches('1. Item 1\n2. Item 2\nIrrelevant text');
      
      expect(rule.produce()).toEqual({
        c: 'ol',
        d: [ {
          c: 'li',
          d: 'Item 1'
        }, {
          c: 'li',
          d: 'Item 2'
        } ]
      });
    });

    it('should start the list at the first numeric location', () => {
      rule.matches('2. List\n3. List');
      
      expect(rule.produce()).toEqual({
        c: 'ol',
        p: {
          start: '2'
        },
        d: [{
          c: 'li',
          d: 'List'
        }, {
          c: 'li',
          d: 'List'
        }]
      });
    });
  });
});