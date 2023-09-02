// function walker({ name }) {
//   return {
//     walk() {
//       console.log(`${name} walked.`);
//     },
//   };
// }

// we can clean above code by using arrow function.

const walker = ({ name }) => ({
  walk() {
    console.log(`${name} walked.`);
  },
});

const swimmer = ({ name }) => ({
  swim() {
    console.log(`${name} swam.`);
  },
});

const flyer = ({ name }) => ({
  fly() {
    console.log(`${name} flew.`);
  },
});

const attacker = ({ name }) => ({
  attack() {
    console.log(`${name} attacked.`);
  },
});

const sleeper = ({ name }) => ({
  sleep() {
    console.log(`${name} slept.`);
  },
});

// Now with these we can easily create a bear, shark , bird and sharknado. based on above functionality
//> these are the behavior's our objects can do. and now we need to define our object based on the behavior's.
// That is the whole idea of composition
// Because you cannot inherit from multiple things. but you can compose from multiple things together to make an object.

function createBear(name) {
  const bear = { name };
  return { ...bear, ...walker(bear), ...sleeper(bear), ...attacker(bear) }; // we need name property which is in our bear object.
}

function createBird(name) {
  const bird = { name };
  return {
    ...bird,
    ...walker(bird),
    ...sleeper(bird),
    ...attacker(bird),
    ...flyer(bird),
  };
}

function createShark(name) {
  const shark = { name };
  return { ...shark, ...swimmer(shark), ...sleeper(shark), ...attacker(shark) };
}

function createSharknado(name) {
  const shark = { name };
  return {
    ...shark,
    ...swimmer(shark),
    ...flyer(shark),
    ...sleeper(shark),
    ...attacker(shark),
  };
}

const bear = createBear("Bear");
bear.attack();
bear.sleep();
bear.walk();

const bird = createBird("Bird");
bird.attack();
bird.sleep();
bird.fly();
bird.walk();

const shark = createShark("Shark");
shark.attack();
shark.sleep();
shark.swim();

const sharkNado = createSharknado("SharkNado");
sharkNado.attack();
sharkNado.sleep();
sharkNado.swim();
sharkNado.fly();
