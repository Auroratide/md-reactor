const React = require('react');
const Highlighter = require('react-syntax-highlighter').Prism;

const SyntaxHighlighter = ({ language, children }) =>
  React.createElement(Highlighter, {
    language,
    useInlineStyles: false,
    codeTagProps: {
      style: null,
      className: 'md-reactor-syntax-highlighter'
    }
  }, children);

module.exports = SyntaxHighlighter;