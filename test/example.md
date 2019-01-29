This file is used for functionally testing aspects of the md-reactor library.

Paragraphs
===============================================================================

Paragraphs are separated by at least two spaces.

Paragraphs are separated by at least two spaces.

Paragraphs are separated by at least two spaces.

Headers
===============================================================================

# h1
## h2
### h3
#### h4
##### h5
###### h6

h1-alt
======

h2-alt
------

Emphasis
===============================================================================

A paragraph may contain _standard emphasis_, **strong emphasis**, or ~~strikethrough~~. *Standard emphasis* and __strong emphasis__ have alternative syntaxes. Text can exhibit **_both_** at the same time.

Lists
===============================================================================

* Unordered List
  * Sub-item 1
  * Sub-item 2

1. Ordered List
2. Second Item
3. Third Item
  10. Lists can start
  11. at numbers other than 1

Links
===============================================================================

A sample [link to my website](https://auroratide.com)! Links may [have titles](https://auroratide.com "My Website").

Images
===============================================================================

![Auroratide Logo](https://auroratide.com/assets/logo/logo_0120.png "It's an A")

Code
===============================================================================

In Javascript, you can use `const` or `let` to declare a variable.

```
const x = 5;

console.log(x + 2);
```

    const x = 5;
    
    console.log(x + 2);

Blockquotes
===============================================================================

> This is a blockquote.
>
> It can be multiple paragraphs long.

Horizontal Rule
===============================================================================

-----

*****

_____

Inline HTML
===============================================================================

<dl>
  <dt>Definition List</dt>
  <dd>Can be used with inline HTML</dd>
  <dt>Markdown in HTML</dt>
  <dd>Does not **work**. <strong>Tags</strong> work instead.</dd>
</dl>

Custom Parser Rules
===============================================================================

,,,
This is an infobox with **standard markdown** and ^^custom markdown^^!
,,,

Render Custom Components
===============================================================================

<Warning>
  This is a warning.
</Warning>