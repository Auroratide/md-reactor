const Context = require('./Context');

const context = new Context();

module.exports = {
  parse: (input) => context.blockParser().parse(input)
};