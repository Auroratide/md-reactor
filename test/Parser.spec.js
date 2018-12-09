const Parser = require('../lib/Parser');

describe('Parser', () => {
  it('should return empty array when input is empty', () => {
    const parser = new Parser();
    expect(parser.parse('')).toEqual([]);
    expect(parser.parse(null)).toEqual([]);
    expect(parser.parse(undefined)).toEqual([]);
  });
});