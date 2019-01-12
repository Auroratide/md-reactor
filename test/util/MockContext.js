const Parser = function() {
  this.parse = jest.fn().mockImplementation(n => n);
};

module.exports = function() {
  this.asInline = new Parser();
  this.asBlock = new Parser();
};