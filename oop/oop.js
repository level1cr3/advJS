// function createUser(email, password, language) {
//   return {
//     email,
//     password,
//     language,
//     printPassword() {
//       console.log(this.password);
//     },
//   };
// }

// console.log(createUser("test@test.com", "password", "English"));

// using prototype
// function CreateUser(email, password, language) {
//   this.email = email;
//   this.password = password;
//   this.language = language;
// }

// CreateUser.prototype.printPassword = function () {
//   console.log(this.password);
// };

// const user = new CreateUser("kyle@simplified.com", "pass", "eng");
// console.log(user);
// user.printPassword();

// class basics

// class User {
//   constructor(email, password, language) {
//     this.email = email;
//     this.password = password;
//     this.language = language;
//   }

//   get name() {
//     return this.email.split("@")[0];
//   }

//   set name(value) {
//     const [, suffix] = this.email.split("@");
//     this.email = `${value}@${suffix}`;
//   }

//   printPassword() {
//     console.log(this.password);
//   }
// }

// const user = new User("kelly@simplified.com", "pass123", "eng");
// user.name = "yogesh";
// console.log(user);

// class inheritance
// class Animal {
//   constructor(name) {
//     this.name = name;
//   }

//   speak() {
//     console.log(`I am ${this.name}`);
//   }
// }

// class Dog extends Animal {
//   constructor(name, owner) {
//     super(name);
//     this.owner = owner;
//   }

//   speak() {
//     console.log("bark");
//   }
// }

// const dog = new Dog("fluffy", "jhon");

// // console.log(dog);
// // console.log(dog.name);
// // dog.speak();

// class Cat extends Animal {
//   speak() {
//     console.log("meow");
//   }
// }

// const cat = new Cat("garfield");
// console.log(cat.name);
// cat.speak();

// inheritance exercise

class Person {
  constructor(name) {
    this.name = name;
  }
}

class Janitor extends Person {
  constructor(name, numberOfMops) {
    super(name);
    this.numberOfMops = numberOfMops;
  }

  _cleaningProductCount = 10; // this how we use protected. we just use convention. it is not actually protected.

  /**
   * @param {number} value
   */
  set cleaningProductCount(value) {
    if (value > 5) this._cleaningProductCount = value;
  }

  clean() {
    this.#helperFunction();
    console.log(
      `${this.name} cleaned with ${this.numberOfMops} mops and used ${this._cleaningProductCount} cleaning products`
    );
  }

  // this is how we use private fields and methods.
  #helperFunction() {
    console.log("some internal calculation");
  }
}

class SuperJanitor extends Janitor {
  _cleaningProductCount = 100;
}

const superJanitr = new SuperJanitor("sam", 5);
superJanitr.clean();
