const Rule = require('./Rule');

module.exports = class Paragraph extends Rule {
  constructor() {
    super(/^([^\n\r]+)(\r?\n\r?\n)?/);
  }

  text() {
    return this.match[1];
  }

  produce() {
    return {
      c: 'p',
      d: this.text()
    };
  }
};