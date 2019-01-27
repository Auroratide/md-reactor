import React from 'react';
import path from 'path';
import fs from 'fs';
import Renderer from '../../lib/rendering';
import { mount } from '../util/enzyme';

describe('md-reactor renderer', () => {
  it('should render the README', () => {
    const content = {
      c: 'div',
      d: JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'readme.json'), 'utf-8'))
    };
    
    const wrapper = mount(<Renderer value={content} />);

    expect(wrapper.children().equals(<div>
      <h1>md-reactor</h1>
      <p><strong>md-reactor</strong> is a utility library for parsing and rendering <strong>markdown</strong> in <strong>React</strong> applications. Hence the name!</p>
      <p>By the way, this very README file is used for end-to-end testing the library!</p>

      <h1>Usage</h1>
      <p>In <strong>md-reactor</strong>, there is <strong>parsing</strong> and <strong>rendering</strong>. The Parser takes as input a string containing markdown and converts it into an object representation of the document. The Renderer is a React component that takes that object representation and converts it into the appropriate components to show on a web page.</p>
      <p><strong>First, parse the markdown:</strong></p>
      <pre><code>{'import Parser from \'md-reactor/parsing\';\n\nconst object = Parser.parse(markdown);'}</code></pre>
      <p><strong>Second, render the object:</strong></p>
      <pre><code>{'import React from \'react\';\nimport Renderer from \'md-reactor/rendering\';\n\nconst Content = ({ contentObject }) =>\n  <div className=\'content\'>\n    <Renderer value={contentObject} />\n  </div>;'}</code></pre>

      <h1>Supported Syntax</h1>
      <p>It turns out there are lots of ways markdown can be parsed and interpretted, leading to specs such as the <a href="https://spec.commonmark.org/">CommonMark Spec</a>, as well as different non-canonical extensions such as <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#tables">Github's table syntax</a>. At present, <strong>md-reactor</strong> does not attempt to follow any one spec, though you'll find it most similarly follows Github's flavor of markdown.</p>
      <p>Below shows the currently supported syntax, as well as how they will be rendered into HTML.</p>

      <h2>Headers</h2>
      <p>You may either use hashes to define headers or the underline style. Headers up to h6 are supported. In order to use the underline-style syntax, at least three "=" or "-" are needed.</p>
      <p><strong>This markdown...</strong></p>
      <pre><code>{'# Header 1\n## Header 2\n### Header 3\n#### Header 4\n##### Header 5\n###### Header 6\n\nHeader 1 Alt\n======\n\nHeader 2 Alt\n------'}</code></pre>
      <p><strong>...becomes this html...</strong></p>
      <pre><code>{'<h1>Header 1</h1>\n<h2>Header 2</h2>\n<h3>Header 3</h3>\n<h4>Header 4</h4>\n<h5>Header 5</h5>\n<h6>Header 6</h6>\n<h1>Header 1 Alt</h1>\n<h2>Header 2 Alt</h2>'}</code></pre>
      <p><strong>...which renders as this:</strong></p>
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
      <h4>Header 4</h4>
      <h5>Header 5</h5>
      <h6>Header 6</h6>
      <h1>Header 1 Alt</h1>
      <h2>Header 2 Alt</h2>

      <h2>Emphasis</h2>
      <p>Asterisks and underscores can be used to define emphasis, like italics or bold. Tildes can be used for strikethrough text.</p>
      <p><strong>This markdown...</strong></p>
      <pre><code>{'For basic emphasis (italics), use single *asterisks* or _underlines_.\n\nFor strong emphasis (bold), use double **asterisks** or __underlines__.\n\nFor strikethrough, use ~~double tildes~~.'}</code></pre>
      <p><strong>...becomes this html...</strong></p>
      <pre><code>{'<p>For basic emphasis (italics), use single <em>asterisks</em> or <em>underlines</em>.</p>\n<p>For strong emphasis (bold), use double <strong>asterisks</strong> or <strong>underlines</strong>.</p>\n<p>For strikethrough, use <del>double tildes</del>.</p>'}</code></pre>
      <p><strong>...which renders as this:</strong></p>
      <p>For basic emphasis (italics), use single <em>asterisks</em> or <em>underlines</em>.</p>
      <p>For strong emphasis (bold), use double <strong>asterisks</strong> or <strong>underlines</strong>.</p>
      <p>For strikethrough, use <del>double tildes</del>.</p>

      <h2>Lists</h2>
      <p>Ordered and unordered lists can be created and nested within one another. It is important to note that to nest lists, <strong>2 spaces</strong> are required as indentation.</p>
      <p><strong>This markdown...</strong></p>
      <pre><code>{'* Unordered List\n  * Sub-item 1\n  * Sub-item 2\n\n1. Ordered List\n2. Second Item\n3. Third Item\n  10. Lists can start\n  11. at numbers other than 1'}</code></pre>
      <p><strong>...becomes this html...</strong></p>
      <pre><code>{'<ul>\n  <li>\n    <p>Unordered List</p>\n    <ul>\n      <li>Sub-item 1</li>\n      <li>Sub-item 2</li>\n    </ul>\n  </li>\n</ul>\n<ol>\n  <li>Ordered List</li>\n  <li>Second Item</li>\n  <li>\n    <p>Third Item</p>\n    <ol start=\"10\">\n      <li>Lists can start</li>\n      <li>at numbers other than 1</li>\n    </ol>\n  </li>\n</ol>'}</code></pre>
      <p><strong>...which renders as this:</strong></p>
      <ul>
        <li>
          <p>Unordered List</p>
          <ul>
            <li>Sub-item 1</li>
            <li>Sub-item 2</li>
          </ul>
        </li>
      </ul>
      <ol>
        <li>Ordered List</li>
        <li>Second Item</li>
        <li>
          <p>Third Item</p>
          <ol start="10">
            <li>Lists can start</li>
            <li>at numbers other than 1</li>
          </ol>
        </li>
      </ol>

      <h2>Links</h2>
      <p>Links are defined using brackets followed by parentheses. The link text goes in the brackets, and the link location goes in the parentheses. An optional title may be provided in quotes with the link location.</p>
      <p><strong>This markdown...</strong></p>
      <pre><code>{'A sample [link to my website](https://auroratide.com)!\n\nLinks may [have titles](https://auroratide.com "My Website").'}</code></pre>
      <p><strong>...becomes this html...</strong></p>
      <pre><code>{'<p>A sample <a href="https://auroratide.com">link to my website</a>!</p>\n<p>Links may <a href="https://auroratide.com" title="My Website">have titles</a>.</p>'}</code></pre>
      <p><strong>...which renders as this:</strong></p>
      <p>A sample <a href="https://auroratide.com">link to my website</a>!</p>
      <p>Links may <a href="https://auroratide.com" title="My Website">have titles</a>.</p>

      <h2>Images</h2>
      <p>Images are defined with an exclamation point followed by the alt-text in brackets, followed by the source in quotes. As with links, title text may optionally be defined in quotes with the source.</p>
      <p><strong>This markdown...</strong></p>
      <pre><code>{'![Auroratide Logo](https://auroratide.com/assets/logo/logo_0120.png "It\'s an A")'}</code></pre>
      <p><strong>...becomes this html...</strong></p>
      <pre><code>{'<p><img src="https://auroratide.com/assets/logo/logo_0120.png" title="It\'s an A" alt="Auroratide Logo" /></p>'}</code></pre>
      <p><strong>...which renders as this:</strong></p>
      <p><img src="https://auroratide.com/assets/logo/logo_0120.png" title="It's an A" alt="Auroratide Logo" /></p>

      <h2>Code</h2>
      <p>Inline code can be defined with single backticks, and code blocks can be defined within three backticks.</p>
      <p><strong>This markdown...</strong></p>
      <pre><code>{'In Javascript, you can use `const` or `let` to declare a variable.\n\n```\nconst x = 5;\n\nconsole.log(x + 2);\n```'}</code></pre>
      <p><strong>...becomes this html...</strong></p>
      <pre><code>{'<p>In Javascript, you can use <code>const</code> or <code>let</code> to declare a variable.</p>\n<pre>\n  <code>\n    const x = 5;\n\n    console.log(x + 2);\n  </code>\n</pre>'}</code></pre>
      <p><strong>...which renders as this:</strong></p>
      <p>In Javascript, you can use <code>const</code> or <code>let</code> to declare a variable.</p>
      <pre><code>{'const x = 5;\n\nconsole.log(x + 2);'}</code></pre>

      <h2>Blockquotes</h2>
      <p>Blockquotes are specified by prepending the line with a greater-than sign (<code>&gt;</code>).</p>
      <p><strong>This markdown...</strong></p>
      <pre><code>{'> This is a blockquote.\n>\n> It can be multiple paragraphs long.'}</code></pre>
      <p><strong>...becomes this html...</strong></p>
      <pre><code>{'<blockquote>\n  <p>This is a blockquote.</p>\n  <p>It can be multiple paragraphs long.</p>\n</blockquote>'}</code></pre>
      <p><strong>...which renders as this:</strong></p>
      <blockquote>
        <p>This is a blockquote.</p>
        <p>It can be multiple paragraphs long.</p>
      </blockquote>

      <h2>Horizontal Rule</h2>
      <p>A horizontal rule can be created with at least three hyphens, asterisks, or underscores.</p>
      <p><strong>This markdown...</strong></p>
      <pre><code>{'-----\n\n*****\n\n_____'}</code></pre>
      <p><strong>...becomes this html...</strong></p>
      <pre><code>{'<hr />\n<hr />\n<hr />'}</code></pre>
      <p><strong>...which renders as this:</strong></p>
      <hr />
      <hr />
      <hr />

      <h2>Inline HTML</h2>
      <p>You may also use inline HTML, which is especially useful for tags without a markdown equivalent. Note, however, that markdown syntax cannot be used within HTML.</p>
      <p><strong>This markdown...</strong></p>
      <pre><code>{'<dl>\n  <dt>Definition List</dt>\n  <dd>Can be used with inline HTML</dd>\n\n  <dt>Markdown in HTML</dt>\n  <dd>Does not **work**. <strong>Tags</strong> work instead.</dd>\n</dl>'}</code></pre>
      <p><strong>...becomes this html...</strong></p>
      <pre><code>{'<dl>\n  <dt>Definition List</dt>\n  <dd>Can be used with inline HTML</dd>\n\n  <dt>Markdown in HTML</dt>\n  <dd>Does not **work**. <strong>Tags</strong> work instead.</dd>\n</dl>'}</code></pre>
      <p><strong>...which renders as this:</strong></p>
      <dl>
        <dt>Definition List</dt>
        <dd>Can be used with inline HTML</dd>
        <dt>Markdown in HTML</dt>
        <dd>Does not **work**. <strong>Tags</strong> work instead.</dd>
      </dl>
    </div>)).toBe(true);
  });
});