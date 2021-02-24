class Item {
  constructor(name, sellIn, quality, expirySpeed = 1){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.expirySpeed = expirySpeed;
  }

  decreaseQuality() {
    this.sellIn--;
    let degradation;
    if (this.sellIn >= 0) {
      degradation = 1;
    } else {
      degradation = 2;
    };
    return (degradation * this.expirySpeed)
  }

  updateQuality() {
    const decreaseQuality = this.decreaseQuality()

    this.quality = this.quality - decreaseQuality;

    if (this.quality < 0) {
      this.quality = 0
    }
  }
}

export default Item