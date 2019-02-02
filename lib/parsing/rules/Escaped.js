import Rule from './Rule';

export default class Escaped extends Rule {
  constructor(context) {
    super(/^\\(.)/, context);
  }

  character() {
    return this.match[1];
  }

  produce() {
    return this.character();
  }
}