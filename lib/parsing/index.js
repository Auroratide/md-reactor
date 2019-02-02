import Context from './Context';

import BasicCodeBlock from './rules/BasicCodeBlock';
import Component from './rules/Component';
import HighlightedCodeBlock from './rules/HighlightedCodeBlock';
import UnorderedList from './rules/UnorderedList';
import OrderedList from './rules/OrderedList';
import HorizontalRule from './rules/HorizontalRule';
import Blockquote from './rules/Blockquote';
import Header from './rules/Header';
import HeaderAlt from './rules/HeaderAlt';
import Paragraph from './rules/Paragraph';
import Ignore from './rules/Ignore';

import Escaped from './rules/Escaped';
import Image from './rules/Image';
import Link from './rules/Link';
import AutoLink from './rules/AutoLink';
import InlineCode from './rules/InlineCode';
import Strong from './rules/Strong';
import Emphasis from './rules/Emphasis';
import Strikethrough from './rules/Strikethrough';
import Character from './rules/Character';

const STANDARD_BLOCK_RULES = [
  BasicCodeBlock,
  Component,
  HighlightedCodeBlock,
  UnorderedList,
  OrderedList,
  HorizontalRule,
  Blockquote,
  Header,
  HeaderAlt,
  Paragraph,
  Ignore
];

const STANDARD_INLINE_RULES = [
  Escaped,
  Image,
  Link,
  AutoLink,
  InlineCode,
  Strong,
  Emphasis,
  Strikethrough,
  Character
];

export default new (class {
  constructor() {
    this.customBlockRules = [];
    this.customInlineRules = [];
  }

  withBlockRules(rules) {
    this.customBlockRules = rules;
    return this;
  }

  withInlineRules(rules) {
    this.customInlineRules = rules;
    return this;
  }

  parse(input) {
    return new Context(
      this.customBlockRules.concat(STANDARD_BLOCK_RULES),
      this.customInlineRules.concat(STANDARD_INLINE_RULES)
    ).asBlock.parse(input);
  }
})();

export { default as Rule } from './rules/Rule';
export { default as ProductionBuilder } from './ProductionBuilder';