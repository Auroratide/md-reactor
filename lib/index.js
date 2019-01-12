const Context = require('./Context');

const context = new Context();

module.exports = {
  parse: (input) => context.asBlock.parse(input)
};