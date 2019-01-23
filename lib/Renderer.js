const React = require('react');

const Renderer = ({ value }) => {
  if(Array.isArray(value)) {
    return value.map(elem => Renderer({ value: elem }));
  } else if(value && value.c) {
    return React.createElement(value.c, value.p, Renderer({ value: value.d }));
  } else {
    return value;
  }
};

module.exports = Renderer;