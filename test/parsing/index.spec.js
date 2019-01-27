import path from 'path';
import fs from 'fs';
import Parser from '../../lib/parsing';

describe('md-reactor parser', () => {
  it('should parse the README', () => {
    const content = fs.readFileSync(path.join(__dirname, '..', '..', 'README.md'), 'utf-8');
    const expected = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'readme.json'), 'utf-8'));

    expect(Parser.parse(content)).toEqual(expected);
  });
});