const Paragraph = require('./rules/Paragraph');
const Strong = require('./rules/Strong');
const Emphasis = require('./rules/Emphasis');
const Character = require('./rules/Character');
const Parser = require('./Parser');

module.exports = class Context {
  constructor() {
    this.asInline = new Parser([ Strong, Emphasis, Character ], this);
    this.asBlock = new Parser([ Paragraph ], this);
  }
};