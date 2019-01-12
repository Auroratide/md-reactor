const Rule = require('./Rule');

module.exports = class Ignore extends Rule {
  constructor(context) {
    super(/^(.|\n|\r)/, context);
  }

  produce() {
    return null;
  }
};