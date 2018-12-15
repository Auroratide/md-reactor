const Context = require('../../lib/Context');
const Character = require('../../lib/rules/Character');

module.exports = class extends Context {
  inline() {
    return [ Character ];
  }

  block() {
    return [ Character ];
  }
};