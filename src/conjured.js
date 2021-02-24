import Item from './item.js';

class Conjured extends Item {
  constructor(name, sellIn, quality, expirySpeed = 2) {
    super(name, sellIn, quality);
    this.expirySpeed = expirySpeed;
  }
}

export default Conjured;