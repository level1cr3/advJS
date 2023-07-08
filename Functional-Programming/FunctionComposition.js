import { compose, flow, groupBy } from "lodash/fp";

// function composition is combining multiple functions into one function.

const array = [1, 2, 3, 4, 5];

function double(num) {
  return num * 2;
}

function addOne(num) {
  return num + 1;
}

function doubleAndAddOne(num) {
  return addOne(double(num)); // function composition is read from inside to outwards. since reading this is difficult we use the
  // library such as 'lodash'
}
// this is function composition

// using lodash
//const doublePlusOne = compose(addOne, double); // in compose the last function is called first and previous one and so on.

// we can use flow if we want function to start from left to right. we can use flow.
const doublePlusOne = flow(double, addOne);

// const result = array.map(double).map(addOne);
const result = array.map(doublePlusOne);

console.log(result);

// so with function composition. essentially we are just calling functions together over and over again with the result of the previous
// function. until you get the final result that you want.

/* the purpose of function composition is that we can create bunch of small functions. and combine them to do the complex task */

console.log(groupBy((element) => element % 2, array));
