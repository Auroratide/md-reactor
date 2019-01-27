const Context = require('./Context');

module.exports = new (class {
  parse(input) {
    return new Context().asBlock.parse(input);
  }
})();