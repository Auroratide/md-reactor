const Paragraph = require('./rules/Paragraph');
const Parser = require('./Parser');

module.exports = {
  parse: (input) => new Parser([ Paragraph ]).parse(input)
};