export const WalkerMixin = (superClass) =>
  class extends superClass {
    walk() {
      console.log(`${this.name} walked.`);
    }
  };

// It takes a class as parameter and its going to create a new class that extends that parameter class and adds the functionality in.
// so we are constantly extending over and over again.

export const FlyerMixin = (superClass) =>
  class extends superClass {
    fly() {
      console.log(`${this.name} flew.`);
    }
  };
