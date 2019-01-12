const path = require('path');
const fs = require('fs');
const MdReactor = require('../lib');

describe('MdReactor End to End', () => {
  it('should parse the document', () => {
    const content = fs.readFileSync(path.join(__dirname, 'content.md'), 'utf-8');

    expect(MdReactor.parse(content)).toEqual([{
      c: 'p',
      d: ['This is a paragraph with ', {
        c: 'strong',
        d: 'bold'
      }, ' text.']
    }, {
      c: 'p',
      d: ['This is a paragraph with ', {
        c: 'em',
        d: 'italicized'
      }, ' text.']
    }, {
      c: 'p',
      d: ['This is a paragraph with ', {
        c: 'strong',
        d: ['bold and ', {
          c: 'em',
          d: 'italicized'
        }]
      }, ' text. Also, it has ', {
        c: 'em',
        d: ['italicized and ', {
          c: 'strong',
          d: 'bold'
        }]
      }, ' text.']
    }, {
      c: 'p',
      d: ['This is a paragraph with ', {
        c: 'del',
        d: 'strikethrough'
      }, ' text.']
    }, {
      c: 'h1',
      d: 'h1'
    }, {
      c: 'h2',
      d: 'h2'
    }, {
      c: 'h3',
      d: 'h3'
    }, {
      c: 'h4',
      d: 'h4'
    }, {
      c: 'h5',
      d: 'h5'
    }, {
      c: 'h6',
      d: 'h6'
    }, {
      c: 'h1',
      d: 'h1-alt'
    }, {
      c: 'h2',
      d: 'h2-alt'
    }, {
      c: 'ul',
      d: [{
        c: 'li',
        d: 'Unordered list'
      }, {
        c: 'li',
        d: 'Second item'
      }, {
        c: 'li',
        d: 'Can use plus'
      }, {
        c: 'li',
        d: 'Or minus as well'
      }]
    }, {
      c: 'ul',
      d: [ {
        c: 'li',
        d: [ {
          c: 'p',
          d: 'This is a separate list.'
        }, {
          c: 'ul',
          d: [ {
            c: 'li',
            d: 'It has a nested list.'
          }, {
            c: 'li',
            d: [ {
              c: 'p',
              d: 'With multiple items.'
            }, {
              c: 'ul',
              d: {
                c: 'li',
                d: 'That are also nested.'
              }
            } ]
          }, {
            c: 'li',
            d: [ {
              c: 'p',
              d: 'Sub item 3'
            }, {
              c: 'p',
              d: 'Paragraph for sub item 3'
            } ]
          } ]
        }]
      }, {
        c: 'li',
        d: 'Item 2'
      } ]
    }]);
  });
});