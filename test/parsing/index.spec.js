const path = require('path');
const fs = require('fs');
const MdReactor = require('../../lib/parsing');

describe('MdReactor End to End', () => {
  it('should parse the README', () => {
    const content = fs.readFileSync(path.join(__dirname, '..', '..', 'README.md'), 'utf-8');
    const expected = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'readme.json'), 'utf-8'));

    expect(MdReactor.parse(content)).toEqual(expected);
  });
});