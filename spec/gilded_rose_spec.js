const { Shop, Item, OnlyFresh, Legend, Conjured } = require('../src/gilded_rose.js');

describe("GildedRose shop manager", function () {
  let listItems;

  beforeEach(function () {
    listItems = [];
  });

  it("1/ Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("2/ La qualité diminue 2 fois plus vite une fois la préremption passée", function () {
    listItems.push(new Item("+5 Dexterity Vest", 0, 10));
    listItems.push(new Item("Mana Cake", -1, 5));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: -1, quality: 8 },
      { sellIn: -2, quality: 3 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("3/ La qualité d'un objet ne peut jamais être inféreure à 0", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 0));
    listItems.push(new Item("Mana Cake", -2, 0));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 9, quality: 0 },
      { sellIn: -3, quality: 0 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("4/ Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new OnlyFresh("Aged Brie", 20, 30));
    listItems.push(new OnlyFresh("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("5/ La qualité d'Aged Brie et Backstage augmente par 3 lorsqu'il reste moins de 5 jours", function () {
    listItems.push(new OnlyFresh("Aged Brie", 4, 30));
    listItems.push(new OnlyFresh("Backstage passes to a TAFKAL80ETC concert", 4, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 3, quality: 33 },
      { sellIn: 3, quality: 33 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("6/ La qualité d'un objet ne dépasse jamais 50", function () {
    listItems.push(new OnlyFresh("Aged Brie", 4, 48));
    listItems.push(new OnlyFresh("Backstage passes to a TAFKAL80ETC concert", 4, 49));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 3, quality: 50 },
      { sellIn: 3, quality: 50 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("7/ La qualité d'un Sulfuras ne diminue jamais", function () {
    listItems.push(new Legend("Sulfuras, Hand of Ragnaros", Infinity, 80));
    listItems.push(new OnlyFresh("Aged Brie", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: Infinity, quality: 80 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("8/ La qualité de Backstage tombe à 0 après le concert (idem Aged Brie)", function () {
    listItems.push(new Item("Mana Cake", 3, 6));
    listItems.push(new OnlyFresh("Backstage passes to a TAFKAL80ETC concert", 0, 30));
    listItems.push(new OnlyFresh("Aged Brie", 0, 40));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 2, quality: 5 },
      { sellIn: -1, quality: 0 },
      { sellIn: -1, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
  
  it("9/ La qualité d'un objet 'Conjured' diminue 2 fois plus vite qu'un objet normal", function () {
    listItems.push(new Conjured("Conjured Dark Blade", 5, 15));
    listItems.push(new Conjured("Conjured Magic Stick", -1, 10));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 4, quality: 13 },
      { sellIn: -2, quality: 6 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

});