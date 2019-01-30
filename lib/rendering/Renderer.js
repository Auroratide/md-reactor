const React = require('react');
const SyntaxHighlighter = require('./SyntaxHighlighter');

const DEFAULT_LIBRARY = { SyntaxHighlighter };

const Renderer = ({ value, library, key }) => {
  if(Array.isArray(value)) {
    return value.map((value, key) => Renderer({ value, library, key }));
  } else if(value && value.c) {
    let component = DEFAULT_LIBRARY[value.c] ? DEFAULT_LIBRARY[value.c] : value.c;
    component = library[value.c] ? library[value.c] : component;
    const props = Object.assign({ key }, value.p);
    
    return React.createElement(component, props, Renderer({ value: value.d, library }));
  } else {
    return value;
  }
};

Renderer.defaultProps = {
  library: {}
};

module.exports = Renderer;