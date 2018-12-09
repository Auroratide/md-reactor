module.exports = class Rule {
  constructor(rule) {
    this.rule = rule;
  }

  matches(str) {
    return this.match = str.match(this.rule);
  }

  consumeToken(str) {
    return str.substring(this.match[0].length, str.length);
  }

  produce() {}
};