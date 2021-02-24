import Item from './item.js';

class Legendary extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  updateQuality() {
    return;
  };
}

export default Legendary;