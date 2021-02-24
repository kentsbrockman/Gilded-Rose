class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    this.items.map((item) => {
      item.updateQuality()
    })
    return this.items;
  }
}

export default Shop