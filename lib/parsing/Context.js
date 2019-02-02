import Parser from './Parser';

export default class Context {
  constructor(blockRules, inlineRules) {
    this.asBlock = new Parser(blockRules, this);
    this.asInline = new Parser(inlineRules, this);
  }
};