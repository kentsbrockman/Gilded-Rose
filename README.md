# Gilded Rose THP

Here's a project meant to practice refactoring and clean code, conducted during [The Hacking Project](https://www.thehackingproject.org/) bootcamp.

The given context is the **implementation of an inventory management system** for a shop that sells a variety of products.

At the very beginning, we received a [grotesque pile of nested ifs](https://github.com/mtbrault/GildedRoseTHP/blob/master/src/gilded_rose.js) to work with.

So, I've come up with a system that at least delimit the scopes of the code in different files.

Besides, as the products have very different characteristics, I've used **Object-oriented programming with classes, class inheritance and class methods** to fit in the context.

Finally, [Jasmine](https://jasmine.github.io/) has been installed for unit testing purposes. You can check in `spec/gilded_rose_spec.js` the code regarding the tests conducted.

---

## Set up 

- Get the resource:
  - Download directly the repository.
  - OR `git clone https://github.com/kentsbrockman/GildedRoseTHP_QPlaud.git`

- `cd GildedRoseTHP_QPlaud`

- `npm install`

- `npm test`

---

## Author

Quentin Plaud : https://github.com/kentsbrockman
