import Item from './item.js'

class Rare extends Item {
  constructor(name, sellIn, quality){
    super(name, sellIn, quality)
  };

  updateQuality(){
    this.sellIn--;

    if (this.sellIn < 0) {
      this.quality = 0;
    };

    if (this.sellIn === 5) {
      this.quality += 3;
    };
    
    if (this.sellIn === 10) {
      this.quality += 2;
    };

    if (this.quality > 50) {
      this.quality = 50;
    };
  }
}

export default Rare