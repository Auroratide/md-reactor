const Paragraph = require('./rules/Paragraph');
const Strong = require('./rules/Strong');
const Character = require('./rules/Character');

module.exports = class Context {
  inline() {
    return [ Strong, Character ];
  }

  block() {
    return [ Paragraph ];
  }
};