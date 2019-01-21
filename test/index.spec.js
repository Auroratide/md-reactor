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
      c: 'ol',
      d: [{
        c: 'li',
        d: 'Numeric list'
      }, {
        c: 'li',
        d: 'Is cool'
      }]
    }, {
      c: 'ul',
      d: [ {
        c: 'li',
        d: [ {
          c: 'p',
          d: 'This is a separate list.'
        }, {
          c: 'ol',
          p: {
            start: '5'
          },
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
    }, {
      c: 'p',
      d: ['I am a ', {
        c: 'a',
        p: {
          href: 'https://auroratide.com'
        },
        d: 'link'
      }, '! I also support ', {
        c: 'a',
        p: {
          href: 'https://auroratide.com',
          title: 'the title'
        },
        d: 'titles'
      }, '. Finally, I support autolinks like ', {
        c: 'a',
        p: {
          href: 'https://auroratide.com'
        },
        d: 'https://auroratide.com'
      }, '.']
    }, {
      c: 'p',
      d: ['I support ', {
        c: 'img',
        p: {
          src: '/file.png',
          alt: 'images'
        }
      }]
    }, {
      c: 'pre',
      d: {
        c: 'code',
        d: 'This is a code block\n\nwith newlines.'
      }
    }]);
  });

  it('should parse the README', () => {
    const content = fs.readFileSync(path.join(__dirname, '..', 'README.md'), 'utf-8');

    expect(MdReactor.parse(content)).toEqual([{
      c: 'h1',
      d: 'md-reactor'
    }, {
      c: 'p',
      d: [{
        c: 'strong',
        d: 'md-reactor'
      }, ' is a utility library for parsing and rendering ', {
        c: 'strong',
        d: 'markdown'
      }, ' in ', {
        c: 'strong',
        d: 'React'
      }, ' applications. Hence the name!']
    }, {
      c: 'p',
      d: 'By the way, this very README file is used for end-to-end testing the library!'
    }, {
      c: 'h1',
      d: 'Supported Syntax'
    }, {
      c: 'p',
      d: ['It turns out there are lots of ways markdown can be parsed and interpretted, leading to specs such as the ', {
        c: 'a',
        p: {
          href: 'https://spec.commonmark.org/'
        },
        d: 'CommonMark Spec'
      }, ', as well as different non-canonical extensions such as ', {
        c: 'a',
        p: {
          href: 'https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#tables'
        },
        d: 'Github\'s table syntax'
      }, '. At present, ', {
        c: 'strong',
        d: 'md-reactor'
      }, ' does not attempt to follow any one spec, though you\'ll find it most similarly follows Github\'s flavor of markdown.']
    }, {
      c: 'p',
      d: 'Below shows the currently supported syntax, as well as how they will be rendered into HTML.'
    }, {
      c: 'h2',
      d: 'Headers'
    }, {
      c: 'p',
      d: 'You may either use hashes to define headers or the underline style. Headers up to h6 are supported. In order to use the underline-style syntax, at least three "=" or "-" are needed.'
    }, {
      c: 'p',
      d: {
        c: 'strong',
        d: 'This markdown...'
      }
    }, {
      c: 'pre',
      d: {
        c: 'code',
        d: '# Header 1\n## Header 2\n### Header 3\n#### Header 4\n##### Header 5\n###### Header 6\n\nHeader 1 Alt\n======\n\nHeader 2 Alt\n------'
      }
    }, {
      c: 'p',
      d: {
        c: 'strong',
        d: '...becomes this html...'
      }
    }, {
      c: 'pre',
      d: {
        c: 'code',
        d: '<h1>Header 1</h1>\n<h2>Header 2</h2>\n<h3>Header 3</h3>\n<h4>Header 4</h4>\n<h5>Header 5</h5>\n<h6>Header 6</h6>\n<h1>Header 1 Alt</h1>\n<h2>Header 2 Alt</h2>'
      }
    }, {
      c: 'p',
      d: {
        c: 'strong',
        d: '...which renders as this:'
      }
    }, {
      c: 'h1',
      d: 'Header 1'
    }, {
      c: 'h2',
      d: 'Header 2'
    }, {
      c: 'h3',
      d: 'Header 3'
    }, {
      c: 'h4',
      d: 'Header 4'
    }, {
      c: 'h5',
      d: 'Header 5'
    }, {
      c: 'h6',
      d: 'Header 6'
    }, {
      c: 'h1',
      d: 'Header 1 Alt'
    }, {
      c: 'h2',
      d: 'Header 2 Alt'
    }, {
      c: 'h2',
      d: 'Emphasis'
    }, {
      c: 'p',
      d: 'Asterisks and underscores can be used to define emphasis, like italics or bold. Tildes can be used for strikethrough text.'
    }, {
      c: 'p',
      d: {
        c: 'strong',
        d: 'This markdown...'
      }
    }, {
      c: 'pre',
      d: {
        c: 'code',
        d: 'For basic emphasis (italics), use single *asterisks* or _underlines_.\n\nFor strong emphasis (bold), use double **asterisks** or __underlines__.\n\nFor strikethrough, use ~~double tildes~~.'
      }
    }, {
      c: 'p',
      d: {
        c: 'strong',
        d: '...becomes this html...'
      }
    }, {
      c: 'pre',
      d: {
        c: 'code',
        d: '<p>For basic emphasis (italics), use single <em>asterisks</em> or <em>underlines</em>.</p>\n<p>For strong emphasis (bold), use double <strong>asterisks</strong> or <strong>underlines</strong>.</p>\n<p>For strikethrough, use <del>double tildes</del>.</p>'
      }
    }, {
      c: 'p',
      d: {
        c: 'strong',
        d: '...which renders as this:'
      }
    }, {
      c: 'p',
      d: ['For basic emphasis (italics), use single ', {
        c: 'em',
        d: 'asterisks'
      }, ' or ', {
        c: 'em',
        d: 'underlines'
      }, '.']
    }, {
      c: 'p',
      d: ['For strong emphasis (bold), use double ', {
        c: 'strong',
        d: 'asterisks'
      }, ' or ', {
        c: 'strong',
        d: 'underlines'
      }, '.']
    }, {
      c: 'p',
      d: ['For strikethrough, use ', {
        c: 'del',
        d: 'double tildes'
      }, '.']
    }, {
      c: 'h2',
      d: 'Lists'
    }, {
      c: 'p',
      d: ['Ordered and unordered lists can be created and nested within one another. It is important to note that to nest lists, ', {
        c: 'strong',
        d: '2 spaces'
      }, ' are required as indentation.']
    }, {
      c: 'p',
      d: {
        c: 'strong',
        d: 'This markdown...'
      }
    }, {
      c: 'pre',
      d: {
        c: 'code',
        d: '* Unordered List\n  * Sub-item 1\n  * Sub-item 2\n\n1. Ordered List\n2. Second Item\n3. Third Item\n  10. Lists can start\n  11. at numbers other than 1'
      }
    }, {
      c: 'p',
      d: {
        c: 'strong',
        d: '...becomes this html...'
      }
    }, {
      c: 'pre',
      d: {
        c: 'code',
        d: '<ul>\n  <li>\n    <p>Unordered List</p>\n    <ul>\n      <li>Sub-item 1</li>\n      <li>Sub-item 2</li>\n    </ul>\n  </li>\n</ul>\n<ol>\n  <li>Ordered List</li>\n  <li>Second Item</li>\n  <li>\n    <p>Third Item</p>\n    <ol start="10">\n      <li>Lists can start</li>\n      <li>at numbers other than 1</li>\n    </ol>\n  </li>\n</ol>'
      }
    }, {
      c: 'p',
      d: {
        c: 'strong',
        d: '...which renders as this:'
      }
    }, {
      c: 'ul',
      d: {
        c: 'li',
        d: [{
          c: 'p',
          d: 'Unordered List'
        }, {
          c: 'ul',
          d: [{
            c: 'li',
            d: 'Sub-item 1'
          }, {
            c: 'li',
            d: 'Sub-item 2'
          }]
        }]
      }
    }, {
      c: 'ol',
      d: [{
        c: 'li',
        d: 'Ordered List'
      }, {
        c: 'li',
        d: 'Second Item'
      }, {
        c: 'li',
        d: [{
          c: 'p',
          d: 'Third Item'
        }, {
          c: 'ol',
          p: {
            start: '10'
          },
          d: [{
            c: 'li',
            d: 'Lists can start'
          }, {
            c: 'li',
            d: 'at numbers other than 1'
          }]
        }]
      }]
    }]);
  });
});