const Rule = require('./Rule');

module.exports = class Character extends Rule {
  constructor() {
    super(/^./);
  }

  produce() {
    return this.match[0];
  }
};