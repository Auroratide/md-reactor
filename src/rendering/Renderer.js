import React from 'react';

const Renderer = ({ value, library, key }) => {
  if(Array.isArray(value)) {
    return value.map((value, key) => Renderer({ value, library, key }));
  } else if(value && value.c) {
    const component = library[value.c] ? library[value.c] : value.c;
    const props = Object.assign({ key }, value.p);
    
    return React.createElement(component, props, Renderer({ value: value.d, library }));
  } else {
    return value;
  }
};

Renderer.defaultProps = {
  library: {}
};

export default Renderer;