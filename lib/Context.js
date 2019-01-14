const UnorderedList = require('./rules/UnorderedList');
const OrderedList = require('./rules/OrderedList');
const Header = require('./rules/Header');
const HeaderAlt = require('./rules/HeaderAlt');
const Paragraph = require('./rules/Paragraph');
const Ignore = require('./rules/Ignore');
const Link = require('./rules/Link');
const Strong = require('./rules/Strong');
const Emphasis = require('./rules/Emphasis');
const Strikethrough = require('./rules/Strikethrough');
const Character = require('./rules/Character');
const Parser = require('./Parser');

module.exports = class Context {
  constructor() {
    this.asInline = new Parser([ Link, Strong, Emphasis, Strikethrough, Character ], this);
    this.asBlock = new Parser([ UnorderedList, OrderedList, Header, HeaderAlt, Paragraph, Ignore ], this);
  }
};