const UnorderedList = require('./rules/UnorderedList');
const OrderedList = require('./rules/OrderedList');
const Blockquote = require('./rules/Blockquote');
const BasicCodeBlock = require('./rules/BasicCodeBlock');
const HighlightedCodeBlock = require('./rules/HighlightedCodeBlock');
const HorizontalRule = require('./rules/HorizontalRule');
const Header = require('./rules/Header');
const HeaderAlt = require('./rules/HeaderAlt');
const Paragraph = require('./rules/Paragraph');
const Ignore = require('./rules/Ignore');
const Image = require('./rules/Image');
const Link = require('./rules/Link');
const AutoLink = require('./rules/AutoLink');
const InlineCode = require('./rules/InlineCode');
const Strong = require('./rules/Strong');
const Emphasis = require('./rules/Emphasis');
const Strikethrough = require('./rules/Strikethrough');
const Character = require('./rules/Character');
const Component = require('./rules/Component');
const Parser = require('./Parser');

module.exports = class Context {
  constructor() {
    this.asInline = new Parser([ Image, Link, AutoLink, InlineCode, Strong, Emphasis, Strikethrough, Character ], this);
    this.asBlock = new Parser([ BasicCodeBlock, Component, HighlightedCodeBlock, UnorderedList, OrderedList, HorizontalRule, Blockquote, Header, HeaderAlt, Paragraph, Ignore ], this);
  }
};