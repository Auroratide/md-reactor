module.exports = class Parser {
  constructor(rules) {
    this.rules = rules;
  }

  parse(input) {
    if(!input || input.length === 0) {
      return [];
    } else {
      for(const Rule of this.rules) {
        const rule = new Rule();
        if(rule.matches(input)) {
          return rule.produce();
        }
      }

      throw new Error('Could not parse remaining text');
    }
  }
};