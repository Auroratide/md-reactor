const React = require('react');

const Renderer = ({ value, key }) => {
  if(Array.isArray(value)) {
    return value.map((value, key) => Renderer({ value, key }));
  } else if(value && value.c) {
    const props = Object.assign({ key }, value.p);
    return React.createElement(value.c, props, Renderer({ value: value.d }));
  } else {
    return value;
  }
};

module.exports = Renderer;