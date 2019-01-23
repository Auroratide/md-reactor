module.exports = class Parser {
  constructor(rules, context) {
    this.rules = rules;
    this.context = context;
  }

  parse(input) {
    const production = [];
    let next = input || '';

    while(next.length > 0) {
      next = this._processNextToken(next, production);
    }

    return production.length === 1 ? production[0] : production;
  }

  _processNextToken(next, production) {
    for(const Rule of this.rules) {
      const rule = new Rule(this.context);
      if(rule.matches(next)) {
        this._addProduction(production, rule);
        return rule.consumeToken(next);
      }
    }

    throw new Error('Could not parse remaining text');
  }

  _addProduction(production, rule) {
    const isString = s => typeof s === 'string';
    const p = rule.produce();

    if(p) {
      const last = production.length - 1;
      if(isString(p) && last >= 0 && isString(production[last])) {
        production[last] = production[last] + p;
      } else {
        production.push(p);
      }
    }
  }
};