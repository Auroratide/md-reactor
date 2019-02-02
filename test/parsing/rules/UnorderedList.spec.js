import UnorderedList from '../../../lib/parsing/rules/UnorderedList';
import Context from '../../util/MockContext';

describe('UnorderedList Rule', () => {
  let rule;
  let context;

  beforeEach(() => {
    context = new Context();
    rule = new UnorderedList(context);
  });

  describe('matches', () => {
    it('should match an asterick', () => {
      expect(rule.matches('* List')).toBeTruthy();
    });

    it('should match a plus', () => {
      expect(rule.matches('+ List')).toBeTruthy();
    });

    it('should match a minus', () => {
      expect(rule.matches('- List')).toBeTruthy();
    });

    it('should not match when there are no spaces between the list indicator and the text', () => {
      expect(rule.matches('*List')).toBeFalsy();
      expect(rule.matches('-List')).toBeFalsy();
      expect(rule.matches('+List')).toBeFalsy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('Ordinary Text')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('* List');
      
      expect(rule.produce()).toEqual({
        c: 'ul',
        d: {
          c: 'li',
          d: 'List'
        }
      });
    });

    it('should keep all list items in a single list', () => {
      rule.matches('* Item 1\n* Item 2\nIrrelevant text');
      
      expect(rule.produce()).toEqual({
        c: 'ul',
        d: [ {
          c: 'li',
          d: 'Item 1'
        }, {
          c: 'li',
          d: 'Item 2'
        } ]
      });
    });
  });
});