export default class Rule {
  constructor(rule, context) {
    this.rule = rule;
    this.context = context;
  }

  matches(str) {
    return this.match = str.match(this.rule);
  }

  consumeToken(str) {
    return str.substring(this.match[0].length, str.length);
  }

  produce() {}
}