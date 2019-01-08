const Parser = function() {
  this.parse = jest.fn().mockImplementation(n => n);
};

module.exports.Parser = Parser;

module.exports.Context = function() {
  this.inlineParser = jest.fn().mockReturnValue(new Parser());
  this.blockParser = jest.fn().mockReturnValue(new Parser());
};