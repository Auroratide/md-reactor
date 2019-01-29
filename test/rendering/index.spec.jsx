import React from 'react';
import path from 'path';
import fs from 'fs';
import Renderer from '../../lib/rendering';
import { mount } from '../util/enzyme';

describe('md-reactor renderer', () => {
  const Warning = ({ children }) => <aside className="warning">{children}</aside>;

  it('should render the README', () => {
    const content = {
      c: 'div',
      d: JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'example.json'), 'utf-8'))
    };

    const library = { Warning };
    
    const wrapper = mount(<Renderer value={content} library={library} />);

    expect(wrapper.children().equals(<div>
      <p>This file is used for functionally testing aspects of the md-reactor library.</p>

      <h1>Paragraphs</h1>
      <p>Paragraphs are separated by at least two spaces.</p>
      <p>Paragraphs are separated by at least two spaces.</p>
      <p>Paragraphs are separated by at least two spaces.</p>

      <h1>Headers</h1>
      <h1>h1</h1>
      <h2>h2</h2>
      <h3>h3</h3>
      <h4>h4</h4>
      <h5>h5</h5>
      <h6>h6</h6>
      <h1>h1-alt</h1>
      <h2>h2-alt</h2>

      <h1>Emphasis</h1>
      <p>A paragraph may contain <em>standard emphasis</em>, <strong>strong emphasis</strong>, or <del>strikethrough</del>. <em>Standard emphasis</em> and <strong>strong emphasis</strong> have alternative syntaxes. Text can exhibit <strong><em>both</em></strong> at the same time.</p>

      <h1>Lists</h1>
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

      <h1>Links</h1>
      <p>A sample <a href="https://auroratide.com">link to my website</a>! Links may <a href="https://auroratide.com" title="My Website">have titles</a>.</p>

      <h1>Images</h1>
      <p><img src="https://auroratide.com/assets/logo/logo_0120.png" title="It's an A" alt="Auroratide Logo" /></p>

      <h1>Code</h1>
      <p>In Javascript, you can use <code>const</code> or <code>let</code> to declare a variable.</p>
      <pre><code>{'const x = 5;\n\nconsole.log(x + 2);'}</code></pre>
      <pre><code>{'const x = 5;\n\nconsole.log(x + 2);'}</code></pre>

      <h1>Blockquotes</h1>
      <blockquote>
        <p>This is a blockquote.</p>
        <p>It can be multiple paragraphs long.</p>
      </blockquote>

      <h1>Horizontal Rule</h1>
      <hr />
      <hr />
      <hr />

      <h1>Inline HTML</h1>
      <dl>
        <dt>Definition List</dt>
        <dd>Can be used with inline HTML</dd>
        <dt>Markdown in HTML</dt>
        <dd>Does not **work**. <strong>Tags</strong> work instead.</dd>
      </dl>

      <h1>Custom Parser Rules</h1>
      <div className="infobox">
        <p>This is an infobox with <strong>standard markdown</strong> and <sup>custom markdown</sup>!</p>
      </div>

      <h1>Render Custom Components</h1>
      <Warning>This is a warning.</Warning>
    </div>)).toBe(true);
  });
});