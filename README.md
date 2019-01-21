# md-reactor

**md-reactor** is a utility library for parsing and rendering **markdown** in **React** applications. Hence the name!

By the way, this very README file is used for end-to-end testing the library!

# Supported Syntax

It turns out there are lots of ways markdown can be parsed and interpretted, leading to specs such as the [CommonMark Spec](https://spec.commonmark.org/), as well as different non-canonical extensions such as [Github's table syntax](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#tables). At present, **md-reactor** does not attempt to follow any one spec, though you'll find it most similarly follows Github's flavor of markdown.

Below shows the currently supported syntax, as well as how they will be rendered into HTML.

## Headers

You may either use hashes to define headers or the underline style. Headers up to h6 are supported. In order to use the underline-style syntax, at least three "=" or "-" are needed.

**This markdown...**

```
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
```

**...becomes this html...**

```
<h1>Header 1</h1>
<h2>Header 2</h2>
<h3>Header 3</h3>
<h4>Header 4</h4>
<h5>Header 5</h5>
<h6>Header 6</h6>
<h1>Header 1 Alt</h1>
<h2>Header 2 Alt</h2>
```

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

```
For basic emphasis (italics), use single *asterisks* or _underlines_.

For strong emphasis (bold), use double **asterisks** or __underlines__.

For strikethrough, use ~~double tildes~~.
```

**...becomes this html...**

```
<p>For basic emphasis (italics), use single <em>asterisks</em> or <em>underlines</em>.</p>
<p>For strong emphasis (bold), use double <strong>asterisks</strong> or <strong>underlines</strong>.</p>
<p>For strikethrough, use <del>double tildes</del>.</p>
```

**...which renders as this:**

For basic emphasis (italics), use single *asterisks* or _underlines_.

For strong emphasis (bold), use double **asterisks** or __underlines__.

For strikethrough, use ~~double tildes~~.

## Lists

Ordered and unordered lists can be created and nested within one another. It is important to note that to nest lists, **2 spaces** are required as indentation.

**This markdown...**

```
* Unordered List
  * Sub-item 1
  * Sub-item 2

1. Ordered List
2. Second Item
3. Third Item
  10. Lists can start
  11. at numbers other than 1
```

**...becomes this html...**

```
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
```

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

```
A sample [link to my website](https://auroratide.com)!

Links may [have titles](https://auroratide.com "My Website").
```

**...becomes this html...**

```
<p>A sample <a href="https://auroratide.com">link to my website</a>!</p>
<p>Links may <a href="https://auroratide.com" title="My Website">have titles</a>.</p>
```

**...which renders as this:**

A sample [link to my website](https://auroratide.com)!

Links may [have titles](https://auroratide.com "My Website").