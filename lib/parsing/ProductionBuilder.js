module.exports = class ProductionBuilder {
  constructor() {
    this.production = {};
  }

  component(c) {
    this.production.c = c;
    return this;
  }

  props(p) {
    this.production.p = p;
    return this;
  }

  children(d) {
    this.production.d = d;
    return this;
  }

  build() {
    return this.production;
  }
};