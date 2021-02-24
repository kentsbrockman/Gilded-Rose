const { Shop, Item, Rare, Legendary, Conjured } = require('../src/gilded_rose.js');

describe("GildedRose shop manager", function () {
  let listItems;

  beforeEach(function () {
    listItems = [];
  });

  it("1/ The quality and expiration date of common items is reduced by 1", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].sellIn).toBe(testCase.sellIn);
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });

  it("2/ The quality of common items drops twice as fast once the expiration date has passed", function () {
    listItems.push(new Item("+5 Dexterity Vest", 0, 10));
    listItems.push(new Item("Mana Cake", -1, 5));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: -1, quality: 8 },
      { sellIn: -2, quality: 3 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].sellIn).toBe(testCase.sellIn);
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });

  it("3/ The quality of a common item can never be less than 0", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 0));
    listItems.push(new Item("Mana Cake", -2, 0));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 9, quality: 0 },
      { sellIn: -3, quality: 0 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].sellIn).toBe(testCase.sellIn);
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });

  it("4/ The quality of a common item can never be more than 50", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 900));
    listItems.push(new Item("Mana Cake", 20, 60));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 9, quality: 50 },
      { sellIn: 19, quality: 50 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].sellIn).toBe(testCase.sellIn);
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });

  it("5/ The quality of a rare item increases by 2 when the expiration date is in 10 days", function () {
    listItems.push(new Rare("Aged Brie", 11, 30));
    listItems.push(new Rare("Backstage passes to a TAFKAL80ETC concert", 11, 40));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 10, quality: 32 },
      { sellIn: 10, quality: 42 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].sellIn).toBe(testCase.sellIn);
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });

  it("6/ The quality of a rare item increases by 3 when the expiration date is in 5 days", function () {
    listItems.push(new Rare("Aged Brie", 6, 30));
    listItems.push(new Rare("Backstage passes to a TAFKAL80ETC concert", 6, 40));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 5, quality: 33 },
      { sellIn: 5, quality: 43 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].sellIn).toBe(testCase.sellIn);
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });

  it("7/ The quality of a rare item can never be more than 50", function () {
    listItems.push(new Rare("Aged Brie", 6, 48));
    listItems.push(new Rare("Backstage passes to a TAFKAL80ETC concert", 6, 49));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 5, quality: 50 },
      { sellIn: 5, quality: 50 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].sellIn).toBe(testCase.sellIn);
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });

  it("8/ The quality of a rare item falls to 0 after the expiration date", function () {
    listItems.push(new Rare("Aged Brie", 0, 40));
    listItems.push(new Rare("Backstage passes to a TAFKAL80ETC concert", 0, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: -1, quality: 0 },
      { sellIn: -1, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].sellIn).toBe(testCase.sellIn);
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });

  it("9/ The quality of a legendary item never decreases and can be more than 50", function () {
    listItems.push(new Legendary("Sulfuras, Hand of Ragnaros", Infinity, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = { sellIn: Infinity, quality: 80 };
    expect(items[0].sellIn).toBe(expected.sellIn);
    expect(items[0].quality).toBe(expected.quality);
  });
  
  it("10/ The quality of a 'Conjured' item decreases twice as fast as a common item", function () {
    listItems.push(new Conjured("Conjured Dark Blade", 5, 35));
    listItems.push(new Conjured("Conjured Magic Stick", -3, 20));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    let expected = [
      { sellIn: 4, quality: 33 },
      { sellIn: -4, quality: 16 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
});