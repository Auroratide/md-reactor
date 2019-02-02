import Rule from './Rule';
import Ignore from './Ignore';
import Character from './Character';
import Whitespace from './Whitespace';
import Parser from '../Parser';
import ProductionBuilder from '../ProductionBuilder';

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

class EndComponent extends Rule {
  constructor(context) {
    super(/^<\/([a-zA-Z0-9_]+)>/, context);
  }

  name() {
    return this.match[1];
  }
}

export default class Component extends Rule {
  constructor(context) {
    super(/^<([a-zA-Z0-9_]+)\s*(.*?)(\/?)>/, context);
  }

  // Override
  matches(str) {
    if(super.matches(str) && this.hasChildren()) {
      const children = [];
      const parser = new Parser([Component, Whitespace, Character], this.context);
      const endComponentRule = new EndComponent();

      let toParse = this.consumeToken(str);
      while(toParse.length > 0 && !endComponentRule.matches(toParse)) {
        toParse = parser._processNextToken(toParse, children);
      }

      if(toParse.length > 0 && endComponentRule.name() === this.name()) {
        toParse = endComponentRule.consumeToken(toParse);
        this._setAll(str.substring(0, str.length - toParse.length));
        this._setChildren(children.length === 1 ? children[0] : children);
      } else {
        this.match = null;
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
    return this._children;
  }

  _setChildren(children) {
    this._children = children;
  }

  produce() {
    return new ProductionBuilder()
      .component(this.name())
      .props(this.attributes())
      .children(this.children())
      .build();
  }
};