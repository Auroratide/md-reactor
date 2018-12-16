const Paragraph = require('./rules/Paragraph');
const Strong = require('./rules/Strong');
const Emphasis = require('./rules/Emphasis');
const Character = require('./rules/Character');

module.exports = class Context {
  inline() {
    return [ Strong, Emphasis, Character ];
  }

  block() {
    return [ Paragraph ];
  }
};