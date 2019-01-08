const Paragraph = require('./rules/Paragraph');
const Strong = require('./rules/Strong');
const Emphasis = require('./rules/Emphasis');
const Character = require('./rules/Character');
const Parser = require('./Parser');

module.exports = class Context {
  inlineParser() {
    return new Parser([ Strong, Emphasis, Character ], this);
  }

  blockParser() {
    return new Parser([ Paragraph ], this);
  }
};