import React from 'react';
import { Prism as Highlighter } from 'react-syntax-highlighter';

const SyntaxHighlighter = ({ language, children }) =>
  React.createElement(Highlighter, {
    language,
    useInlineStyles: false,
    codeTagProps: {
      style: null,
      className: 'md-reactor-syntax-highlighter'
    }
  }, children);

export default SyntaxHighlighter;