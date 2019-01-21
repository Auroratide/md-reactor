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

**...becomes this:**

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