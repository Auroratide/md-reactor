const ListItem = require('../../lib/rules/ListItem');
const Context = require('../util/MockContext');

describe('ListItem Rule', () => {
  let rule;
  let context;

  beforeEach(() => {
    context = new Context();
    rule = new ListItem(context);
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

    it('should not match text prepended with a space', () => {
      expect(rule.matches(' Ordinary Text')).toBeFalsy();
    });
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('* Item');
      
      expect(rule.produce()).toEqual({
        c: 'li',
        d: 'Item'
      });
    });

    it('should parse item as inline when it is the only a single line', () => {
      rule.matches('* Item 1\n* Item 2');
      rule.produce();
      
      expect(context.asInline.parse).toHaveBeenCalledWith('Item 1');
    });

    it('should parse item as block when it is multiple lines', () => {
      rule.matches('* Item 1\n\n  Item 2');
      rule.produce();
      
      expect(context.asBlock.parse).toHaveBeenCalledWith('Item 1\n\nItem 2');
    });

    it('should parse item as block when there is a nested list', () => {
      rule.matches('* Item 1\n  * Item 2\n  * Item 3');
      rule.produce();
      
      expect(context.asBlock.parse).toHaveBeenCalledWith('Item 1\n* Item 2\n* Item 3');
    });
  });
});