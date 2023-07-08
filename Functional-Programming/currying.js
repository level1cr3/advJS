import { curry, groupBy, sortBy, compose } from "lodash/fp";

// The whole idea of currying is taking a function and reducing the number of arguments in that function.
// preferably all the way down to one. So essentially we are creating a new function that already have the other arguments applied.

// It is very similar to using a 'Bind' function inside a javascript.

function sum(a, b) {
  return a + b;
}

console.log(sum(1, 2));

// what currying does. So we essentially take in a sum function.
//we used curring to reduce it to two function that only take one argument

function add(a) {
  return (b) => {
    return a + b;
  };
}

console.log(add(1)(3));
// add returns a 'function'. and to that function we pass the second argument.

// This is where the 'bind' comes in handy. because we can use bind to do this for us essentially.

console.log(sum.bind(null, 1)(4));

// lodash has a built in curry function in which we can use.

console.log(curry(sum)(2)(4));

// because by calling 'curry' this just creates a brand new function.
// That separates all the arguments in our sum to individual functions

// # why do we need this ?
//> It allows us to partially apply the certain functions. that way it is easier for us to 'compose' and chain together functions.

// Example

const array = [
  {
    name: "kyle",
  },
  {
    name: "sally",
  },
  {
    name: "Joey",
  },
];

console.log(
  groupBy(
    (val) => val.name.length,
    sortBy((item) => item.name, array)
  )
);

console.log(groupBy((val) => val.name.length, array));

const composedFunction = compose(
  groupBy((item) => item.name.length),
  sortBy((item) => item.name)
);

console.log(composedFunction(array));

// in lodash i think we should you use flow rather then compose. it is easier to read.

// groupBy and sortBy take the 2nd argument as array. something interesting about lodash/fp. is all of their
// functions curry themselves

console.log(groupBy.bind(this, (i) => i.name.length));

// the below is same as above. because lodash automatically does the currying for you.

console.log(groupBy((item) => item.name.length)); // this returns a function.

// so if you pass only one argument to the functions of lodash. it will automatically curry that function so it
// returns a brand new function that takes in the another argument.

console.log(groupBy((item) => item.name.length)(array));

const composFunc = compose(
  groupBy((item) => item.name.length),
  sortBy((item) => item.name)
);

// the reason that currying is important. because when we compose our function. we can't actually pass in our array over here.
// Because we are trying to create a new function that does other things and we want all these functions to accept one argument
// which is our array but they normally accept two and we are currying it down.

// groupBy((item) => item.name.length), every single time call this function we are saying we wanna group by this argument but we don't
// know the 2nd argument yet. we are gonna wait for it be passed. thats essentially what currying does.

// we use currying to make it easier to compose functions. which then makes it easier to use small functions to do larger things
