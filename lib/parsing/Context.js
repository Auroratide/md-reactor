const Parser = require('./Parser');

module.exports = class Context {
  constructor(blockRules, inlineRules) {
    this.asBlock = new Parser(blockRules, this);
    this.asInline = new Parser(inlineRules, this);
  }
};