# md-reactor

**md-reactor** is a utility library for parsing and rendering **markdown** in **React** applications. Hence the name!

**Table of Contents**

1. [Usage](#usage)
2. [Supported Syntax](#supported-syntax)
3. [Special Features](#special-features)
   1. [Custom Parser Rules](#custom-parser-rules)
   2. [Render Custom Components](#render-custom-components)

<a name="usage"></a>
# Usage

In **md-reactor**, there is **parsing** and **rendering**. The Parser takes as input a string containing markdown and converts it into an object representation of the document. The Renderer is a React component that takes that object representation and converts it into the appropriate components to show on a web page.

**First, parse the markdown:**

```
import Parser from 'md-reactor/parsing';

const object = Parser.parse(markdown);
```

**Second, render the object:**

```
import React from 'react';
import Renderer from 'md-reactor/rendering';

const Content = ({ contentObject }) =>
  <div className='content'>
    <Renderer value={contentObject} />
  </div>;
```

<a name="supported-syntax"></a>
# Supported Syntax

It turns out there are lots of ways markdown can be parsed and interpretted, leading to specs such as the [CommonMark Spec](https://spec.commonmark.org/), as well as different non-canonical extensions such as [Github's table syntax](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#tables). At present, **md-reactor** does not attempt to follow any one spec, though you'll find it most similarly follows Github's flavor of markdown.

Below shows the currently supported syntax, as well as how they will be rendered into HTML.

## Headers

You may either use hashes to define headers or the underline style. Headers up to h6 are supported. In order to use the underline-style syntax, at least three "=" or "-" are needed.

**This markdown...**

    # Header 1
    ## Header 2
    ### Header 3
    #### Header 4
    ##### Header 5
    ###### Header 6
    
    Header 1 Alt
    ======
    
    Header 2 Alt
    ------

**...becomes this html...**

    <h1>Header 1</h1>
    <h2>Header 2</h2>
    <h3>Header 3</h3>
    <h4>Header 4</h4>
    <h5>Header 5</h5>
    <h6>Header 6</h6>
    <h1>Header 1 Alt</h1>
    <h2>Header 2 Alt</h2>

**...which renders as this:**

# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

Header 1 Alt
======

Header 2 Alt
------

## Emphasis

Asterisks and underscores can be used to define emphasis, like italics or bold. Tildes can be used for strikethrough text.

**This markdown...**

    For basic emphasis (italics), use single *asterisks* or _underlines_.
    
    For strong emphasis (bold), use double **asterisks** or __underlines__.
    
    For strikethrough, use ~~double tildes~~.

**...becomes this html...**

    <p>For basic emphasis (italics), use single <em>asterisks</em> or <em>underlines</em>.</p>
    <p>For strong emphasis (bold), use double <strong>asterisks</strong> or <strong>underlines</strong>.</p>
    <p>For strikethrough, use <del>double tildes</del>.</p>

**...which renders as this:**

For basic emphasis (italics), use single *asterisks* or _underlines_.

For strong emphasis (bold), use double **asterisks** or __underlines__.

For strikethrough, use ~~double tildes~~.

## Lists

Ordered and unordered lists can be created and nested within one another. It is important to note that to nest lists, **2 spaces** are required as indentation.

**This markdown...**

    * Unordered List
      * Sub-item 1
      * Sub-item 2
    
    1. Ordered List
    2. Second Item
    3. Third Item
      10. Lists can start
      11. at numbers other than 1

**...becomes this html...**

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

**...which renders as this:**

* Unordered List
  * Sub-item 1
  * Sub-item 2

1. Ordered List
2. Second Item
3. Third Item
  10. Lists can start
  11. at numbers other than 1

## Links

Links are defined using brackets followed by parentheses. The link text goes in the brackets, and the link location goes in the parentheses. An optional title may be provided in quotes with the link location.

**This markdown...**

    A sample [link to my website](https://auroratide.com)!
    
    Links may [have titles](https://auroratide.com "My Website").
    
    Standard links, like https://auroratide.com, are also automatically detected.

**...becomes this html...**

    <p>A sample <a href="https://auroratide.com">link to my website</a>!</p>
    <p>Links may <a href="https://auroratide.com" title="My Website">have titles</a>.</p>
    <p>Standard links, like <a href="https://auroratide.com">https://auroratide.com</a>, are also automatically detected.</p>

**...which renders as this:**

A sample [link to my website](https://auroratide.com)!

Links may [have titles](https://auroratide.com "My Website").

Standard links, like https://auroratide.com, are also automatically detected.

## Images

Images are defined with an exclamation point followed by the alt-text in brackets, followed by the source in quotes. As with links, title text may optionally be defined in quotes with the source.

**This markdown...**

    ![Auroratide Logo](https://auroratide.com/assets/logo/logo_0120.png "It's an A")

**...becomes this html...**

    <p><img src="https://auroratide.com/assets/logo/logo_0120.png" title="It's an A" alt="Auroratide Logo" /></p>

**...which renders as this:**

![Auroratide Logo](https://auroratide.com/assets/logo/logo_0120.png "It's an A")

## Code

Inline code can be defined with single backticks, and code blocks can be defined with a 4-space indent.

**This markdown...**

    In Javascript, you can use `const` or `let` to declare a variable.
    
    
        const x = 5;
        
        console.log(x + 2);
    

**...becomes this html...**

    <p>In Javascript, you can use <code>const</code> or <code>let</code> to declare a variable.</p>
    <pre>
      <code>
        const x = 5;
    
        console.log(x + 2);
      </code>
    </pre>

**...which renders as this:**

In Javascript, you can use `const` or `let` to declare a variable.

    const x = 5;
    
    console.log(x + 2);

## Syntax Highlighting

Syntax highlighting is supported when used in conjunction with the Renderer. **md-reactor** uses [Prism](https://prismjs.com/) to highlight code. To specify code you want highlighted, encase your code block in triple backticks. The language for the code should be provided in order to get the correct highlighting.

**Note:** For the syntax highlighter to work, it _does not_ parse to base html components. It parses to a `SyntaxHighlighter` component which is built into **md-reactor**. If you use the `Renderer` component, everything will work nicely.

**This markdown...**

    ```javascript
    const x = 5;
    
    console.log(x + 2);
    ```

**...becomes this...**

    <SyntaxHighlighter language="javascript">
      const x = 5;
      
      console.log(x + 2);
    </SyntaxHighlighter>

**...which renders as this:**

```javascript
const x = 5;

console.log(x + 2);
```

## Blockquotes

Blockquotes are specified by prepending the line with a greater-than sign (`>`).

**This markdown...**

    > This is a blockquote.
    >
    > It can be multiple paragraphs long.

**...becomes this html...**

    <blockquote>
      <p>This is a blockquote.</p>
      <p>It can be multiple paragraphs long.</p>
    </blockquote>

**...which renders as this:**

> This is a blockquote.
>
> It can be multiple paragraphs long.

## Horizontal Rule

A horizontal rule can be created with at least three hyphens, asterisks, or underscores.

**This markdown...**

    -----
    
    *****
    
    _____

**...becomes this html...**

    <hr />
    <hr />
    <hr />

**...which renders as this:**

-----

*****

_____

## Inline HTML

You may also use inline HTML, which is especially useful for tags without a markdown equivalent. Note, however, that markdown syntax cannot be used within HTML.

**This markdown...**

    <dl>
      <dt>Definition List</dt>
      <dd>Can be used with inline HTML</dd>
    
      <dt>Markdown in HTML</dt>
      <dd>Does not **work**. <strong>Tags</strong> work instead.</dd>
    </dl>

**...becomes this html...**

    <dl>
      <dt>Definition List</dt>
      <dd>Can be used with inline HTML</dd>
    
      <dt>Markdown in HTML</dt>
      <dd>Does not **work**. <strong>Tags</strong> work instead.</dd>
    </dl>

**...which renders as this:**

<dl>
  <dt>Definition List</dt>
  <dd>Can be used with inline HTML</dd>
  <dt>Markdown in HTML</dt>
  <dd>Does not **work**. <strong>Tags</strong> work instead.</dd>
</dl>

<a name="special-features"></a>
# Special Features

**md-reactor** has a few special features that allow you to customize parsing and rendering. If you've ever wanted to define your own special syntax or render your own React components, here's how!

<a name="custom-parser-rules"></a>
## Custom Parser Rules

Custom parser rules allow you to define your own custom markdown syntax. So, you can personalize the markdown you use to best fit the particular needs of your site.

To do this, you need to follow the below steps. Don't worry, we'll be using an example to illustrate this!

1. Define a rule by extending the `Rule` class
2. Add the rule to the parsing context

Let's say that our website makes extensive use of **infoboxes** meant to show information to the reader that is perhaps helpful but not essential for understanding the whole article. We use them a lot, so we want to define our own syntax for them. And we want to use three commas to denote the infoboxes, like below:

    ,,,
    This is an infobox!
    ,,,

First, we **define a rule by extending the** `Rule` **class**.

```
import { Rule, ProductionBuilder } from 'md-reactor/parsing';

export default class Infobox extends Rule {
  constructor(context) {
    super(/^,,,\r?\n((?:.|\r?\n)*)\r?\n,,,/, context);
  }

  text() {
    return this.match[1];
  }

  produce() {
    return new ProductionBuilder()
      .component('div')
      .props({
        className: 'infobox'
      })
      .children(this.context.asBlock.parse(this.text()))
      .build();
  }
}
```

Let's dissect this code a little further.

* The parser is **regex-based**, meaning it uses regex to determine whether a block of text matches the given rule. You define the regex in the constructor, making sure to use capture groups for any important text or attributes. Note to _always include the beginning_ `^` _caret_, as the parser always looks at the current front of the string.
* If you use capture groups in your regex definition, they will be stored in the `this.match` instance variable. `this.match[0]` contains the entire matched string, and every index afterward will contain the content of your capture groups.
* Finally, define the `produce()` method in order to convert the rule into the object notation that the renderer understands. You can use `ProductionBuilder` to create the object notation for you.
* So what is `this.context`? The context holds some information regarding the entire parsing process. It principally allows you to parse children further; this way, we can have markdown inside of our infobox! `this.context.asBlock.parse()` will parse text as block elements (paragraphs, code blocks, etc), and `this.context.asInline.parse()` will parse text as inline elements (strong, italics, etc).

Second, **add the rule to the parsing context**. This is done when parsing your overall markdown content, as below:

```
import Parser from 'md-reactor/parsing';
import Infobox from './rules/Infobox';

const object = Parser
  .withBlockRules([InfoBox])
  .parse(markdown);
```

The Parser defines two methods `withBlockRules()`, for rules meant to be parsed at the block level, and `withInlineRules()`, for rules meant to be parsed at the inline level. Both of these methods take an **array of rule classes** as a parameter, so you may declare more than one rule at once. The rules should be in order of precedence, meaning rules at the beginning of the ray will be attempted first by the parser. Also, all custom rules have precedence over the built-in rules, so you can actually override innate rules if you wish.

Feel free to utilize any of the [built-in rules](https://github.com/Auroratide/md-reactor/tree/master/lib/parsing/rules) as examples and inspiration for defining your own custom rules!

<a name="render-custom-components"></a>
## Render Custom Components

This is the true superpower of **md-reactor**. Simply speaking, the `Renderer` is capable of rendering your personalized React components. In the context of parsing, this means that _from markdown_ you can ultimately render any component in your personal library. Let's see how that works!

First, let's talk about the parser. The parser converts markdown into an object notation that encodes what components to render. The component names, interestingly, can be _any string_. So actually, the following markdown...

    <MyComponent text="Super cool!" />

...will produce the following object:

    {
      "c": "MyComponent",
      "p": {
        "text": "Super cool!"
      }
    }

Notice the `"MyComponent"` in there? That's the name of your custom component. So, how does the renderer know what to render when it sees that name?

To render custom components with the Renderer, you only need to supply a prop called `library`. The `library` prop is a standard Javascript object whose keys are the names of your custom components and whose values are references to the respective components.

So if we want to render `MyComponent`, all we need to do is supply this component to the `library` prop like so:

    import React from 'react';
    import Renderer from 'md-reactor/rendering';
    import MyComponent from './MyComponent';
    
    const library = {
      MyComponent
    };
    
    const Content = ({ contentObject }) =>
      <div className='content'>
        <Renderer value={contentObject} library={library} />
      </div>;
