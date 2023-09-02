// composition with classes. we can either pass the object whose functionality we need in the constructor.
// or we can use the mixins. Use mixins in js.
// In C# as well if you do pass the object. make sure that object has proper name and makes sense

import { FlyerMixin, WalkerMixin } from "./mixins.js";

class Animal {
  constructor(name) {
    this.name = name;
  }

  attack() {
    console.log(`${this.name} attacked.`);
  }

  sleep() {
    console.log(`${this.name} slept.`);
  }
}

class Bear extends WalkerMixin(Animal) {}

class Bird extends FlyerMixin(WalkerMixin(Animal)) {}

const bear = new Bear("Bear");
bear.attack();
bear.sleep();
bear.walk();

const bird = new Bird("Bird");
bird.attack();
bird.sleep();
bird.fly();
bird.walk();
