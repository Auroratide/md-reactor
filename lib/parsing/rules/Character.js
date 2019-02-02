import Rule from './Rule';

export default class Character extends Rule {
  constructor() {
    super(/^./);
  }

  produce() {
    return this.match[0];
  }
};