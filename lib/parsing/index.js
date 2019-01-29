const Context = require('./Context');

const STANDARD_BLOCK_RULES = [
  require('./rules/BasicCodeBlock'),
  require('./rules/Component'),
  require('./rules/HighlightedCodeBlock'),
  require('./rules/UnorderedList'),
  require('./rules/OrderedList'),
  require('./rules/HorizontalRule'),
  require('./rules/Blockquote'),
  require('./rules/Header'),
  require('./rules/HeaderAlt'),
  require('./rules/Paragraph'),
  require('./rules/Ignore')
];

const STANDARD_INLINE_RULES = [
  require('./rules/Image'),
  require('./rules/Link'),
  require('./rules/AutoLink'),
  require('./rules/InlineCode'),
  require('./rules/Strong'),
  require('./rules/Emphasis'),
  require('./rules/Strikethrough'),
  require('./rules/Character')
];

module.exports = new (class {
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

module.exports.Rule = require('./rules/Rule');
module.exports.ProductionBuilder = require('./ProductionBuilder');