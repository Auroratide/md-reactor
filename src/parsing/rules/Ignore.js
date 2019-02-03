import Rule from './Rule';

export default class Ignore extends Rule {
  constructor(context) {
    super(/^(.|\n|\r)/, context);
  }

  produce() {
    return null;
  }
}