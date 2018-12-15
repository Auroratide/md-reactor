const Parser = require('./Parser');
const Context = require('./Context');

const context = new Context();

module.exports = {
  parse: (input) => new Parser(context.block(), context).parse(input)
};