const array = [1, 2, 3, 4, 5];

const newArray = array.map((val) => val * 2);

console.log(newArray);

/*
with functional programming you cannot use any kind of loop. That is because every type of loop you use has some type of 
variable that is mutated.

To get around this what we use is a higher order function. essentially functions that you passed to other functions.

Array.map() is a higher order function. because map() is a function and value that you pass to that function is another function.

higher order functions are essentially a callback func.

Generally in higher order function we are doing this to simulate the looping. or going an iterating over an object

we can chain together this higher order functions.

we have few built in higher order function such as map, reduce, filter etc.
*/

// creating our own higher order function.

function everyOtherMap(array, func) {
  return array.map((val, i) => {
    if (i % 2 == 0) return func(val);
    return val;
  });
}

console.log(everyOtherMap(array, (val) => val * 2));

// Technically when it comes to higher order functions. In functional programming it is best if the actual function is kind of
// seprate from the thing that it is working on.
// So in our case we can pass anything that supports 'map' property.

// const nodelist = [...document.querySelectorAll("div")];
// nodelist.map()
// since nodelist doesn't support a 'map'. a lot of time you gonna have to convert it to the array

// exercise.

const people = [
  {
    name: "kyle",
    friends: ["jhon", "sally"],
  },
  {
    name: "joey",
    friends: ["kyle"],
  },
  {
    name: "sally",
    friends: ["jhon", "kyle"],
  },
];

// create a function called groupBy(). This is going to be a higher order function. and it is going to group by whatever you pass in.
// we wanna group these people by the amount of friends they have.
/*
 output => 
{
  1: [
    {
      name: "joey",
      friends: ["kyle"],
    },
  ],
  2: [
    {
      name: "kyle",
      friends: ["jhon", "sally"],
    },
    {
      name: "sally",
      friends: ["jhon", "kyle"],
    },
  ],
}
*/

const result = groupBy(people, (val) => val.friends.length);
console.log(result);

function groupBy(array, func) {
  return array.reduce((grouping, element) => {
    const key = func(element);
    if (grouping[key] == null) grouping[key] = [];
    grouping[key].push(element);
    return grouping;
  }, {});
}
