import HighlightedCodeBlock from '../../../src/parsing/rules/HighlightedCodeBlock';
import Context from '../../util/MockContext';

describe('HighlightedCodeBlock Rule', () => {
  let rule;
  let context;

  beforeEach(() => {
    context = new Context();
    rule = new HighlightedCodeBlock(context);
  });

  describe('matches', () => {

    it('should match triple backticks', () => {
      expect(rule.matches('```\ncodeblock\n```')).toBeTruthy();
    });

    it('should match triple backticks with a language', () => {
      expect(rule.matches('```javascript\ncodeblock\n```')).toBeTruthy();
    });

    it('should not match triple backticks inline', () => {
      expect(rule.matches('```codeblock```')).toBeFalsy();
    });

    it('should not match unmatched triple backticks', () => {
      expect(rule.matches('```\ncodeblock')).toBeFalsy();
    });

    it('should not match for single or double backticks', () => {
      expect(rule.matches('`\ncodeblock\n`')).toBeFalsy();
      expect(rule.matches('``\ncodeblock\n``')).toBeFalsy();
    });

    it('should not match invalid language name', () => {
      expect(rule.matches('```$\ncodeblock\n```')).toBeFalsy();
      expect(rule.matches('```T\ncodeblock\n```')).toBeFalsy();
    });

    it('should not match ordinary text', () => {
      expect(rule.matches('Not italic')).toBeFalsy();
    });
  
  });

  describe('produce', () => {
    it('should create production', () => {
      rule.matches('```\ncodeblock\n```');
      
      expect(rule.produce()).toEqual({
        c: 'SyntaxHighlighter',
        d: 'codeblock',
        p: {}
      });
    });

    it('should include language as a prop', () => {
      rule.matches('```java\ncodeblock\n```');
      
      expect(rule.produce()).toEqual({
        c: 'SyntaxHighlighter',
        d: 'codeblock',
        p: {
          language: 'java'
        }
      });
    });

    it('should include newlines in the codeblock', () => {
      rule.matches('```\ncodeblock\n\nwith newlines\n```');
      
      expect(rule.produce()).toEqual({
        c: 'SyntaxHighlighter',
        d: 'codeblock\n\nwith newlines',
        p: {}
      });
    });
  });
});