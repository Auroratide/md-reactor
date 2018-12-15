const path = require('path');
const fs = require('fs');
const MdReactor = require('../lib');

describe('MdReactor End to End', () => {
  it('should parse the document', () => {
    const content = fs.readFileSync(path.join(__dirname, 'content.md'), 'utf-8');

    expect(MdReactor.parse(content)).toEqual({
      c: 'p',
      d: ['This is a paragraph with ', {
        c: 'strong',
        d: 'bold'
      }, ' text.']
    });
  });
});