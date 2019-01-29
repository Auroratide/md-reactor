import path from 'path';
import fs from 'fs';
import Parser from '../../lib/parsing';

describe('md-reactor parser', () => {
  it('should parse markdown', () => {
    const content = fs.readFileSync(path.join(__dirname, '..', 'example.md'), 'utf-8');
    const expected = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'example.json'), 'utf-8'));

    expect(Parser.parse(content)).toEqual(expected);
  });
});