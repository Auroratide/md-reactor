const Rule = require('./Rule');

module.exports = class Whitespace extends Rule {
  constructor() {
    super(/^(\s)\s*/);
  }

  isNewline() {
    return this.match[1] === '\r' || this.match[1] === '\n';
  }

  produce() {
    return this.isNewline() ? '' : ' ';
  }
};