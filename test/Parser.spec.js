const Parser = require('../lib/Parser');

describe('Parser', () => {
  it('should return empty array when input string is empty', () => {
    const parser = new Parser();
    expect(parser.parse('')).toEqual([]);
  });
});