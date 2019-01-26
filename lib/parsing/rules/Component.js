const Rule = require('./Rule');
const Ignore = require('./Ignore');
const Character = require('./Character');
const Whitespace = require('./Whitespace');
const Parser = require('../Parser');
const ProductionBuilder = require('../ProductionBuilder');

class Attribute extends Rule {
  constructor() {
    super(/^([A-Za-z0-9_]+)="(.*?[^\\])"/);
  }

  prop() {
    return this.match[1];
  }

  value() {
    return this.match[2];
  }

  produce() {
    return {
      [this.prop()]: this.value()
    };
  }
}

module.exports = class Component extends Rule {
  constructor(context) {
    super(/^<([a-zA-Z0-9_]+)\s*(.*?)(\/?)>/, context);
  }

  // Override
  matches(str) {
    if(super.matches(str) && this.hasChildren()) {
      const endTag = `</${this.name()}>`;
      const endTagPosition = str.search(endTag);

      if(endTagPosition < 0) {
        this.match = null;
      } else {
        const startTag = this.match[0];
        this._setAll(str.substring(0, endTagPosition + endTag.length));
        this._setChildren(str.substring(startTag.length, endTagPosition));
      }
    }

    return this.match;
  }

  _setAll(str) {
    this.match[0] = str;
  }

  name() {
    return this.match[1];
  }

  attributes() {
    let props = new Parser([Attribute, Ignore], this.context).parse(this.match[2]) || {};
    if(Array.isArray(props))
      props = props.reduce((obj, cur) => Object.assign(obj, cur), {});

    return Object.keys(props).length > 0 ? props : undefined;
  }

  hasChildren() {
    return this.match[3] !== '/';
  }

  children() {
    if(this.match[4])
      return new Parser([Component, Whitespace, Character], this.context).parse(this.match[4]);
    else
      return undefined;
  }

  _setChildren(str) {
    this.match[4] = str;
  }

  produce() {
    return new ProductionBuilder()
      .component(this.name())
      .props(this.attributes())
      .children(this.children())
      .build();
  }
};