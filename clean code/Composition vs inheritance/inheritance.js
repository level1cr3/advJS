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

class Bear extends Animal {
  walk() {
    console.log(`${this.name} walked.`);
  }
}

class Shark extends Animal {
  swim() {
    console.log(`${this.name} swam.`);
  }
}

class Bird extends Animal {
  fly() {
    console.log(`${this.name} flew`);
  }
}

const bear = new Bear("Bear");
bear.attack();
bear.sleep();
bear.walk();

const shark = new Shark("Shark");
shark.attack();
shark.sleep();
shark.swim();

const bird = new Bird("Bird");
bird.attack();
bird.sleep();
bird.fly();

/* 
> The above structure is typical inheritance structure.
> There are problems with this code. 
ex : A bird can walk and fly. so we also need the 'walk' functionality in bird.
we can do this in 3 ways.
> either we can add the walk in parent class animal : But that is wrong since not all animals can walk.
> next what we can do is inherit from bear since it has walk function. : But that is also wrong because bird is not a bear.
> we can add the walk() function in 'Bird class' : this is good but now we have 2 duplicate methods in each class that do the same thing.

#> So the solution is instead of using 'inheritance we are gonna use the composition.'
> Instead of thinking about object as in what they are. we think of an object as what do they do.
> You can see how the composition version will work in composition.js

*/
