const array = [1, 2, 3, 4];
const TAXES = 1.07;

function addElement(arr, element) {
  return [...arr, element, TAXES];
}
/*  This is a pure function. because 
        1) It relies only on its inputs.  
        2) It does not change any outside values.
        we can use the constant 'values' in pure function because they will not change 
        (It is no different then if we passed it as argument to the function).
         However same is not true for array and objects from outside because the value in them can be changed. 


 Rule 1 : you must always relie on the inputs or global constant variables.
 Rule 2 : you cannot have any side-effects. So thing likes modifying variables outside of that scope. modifying the inputs in a way
          that changes them or even calling an API. because calling an API is side-effeft         
          anything wheather it is mutating a data. calling a database


The reason for all this rules.

The pure function at it's core defination says : given the exact same input. I will always get the exact same output returned with 
no side-effects and no additional changes.

another way of thinking of it is like math function: because a math function such as 2 + 2 always returns 4 


calling impure function inside pure function makes it impure as well.

so we should only call the functions that are pure inside the pure function.
*/

console.log(addElement(array, 5));
console.log(array);

// exercise

const person = {
  name: "Kyle",
  friends: ["Jhon", "Sally"],
};

function addFriend(arr, friendName) {
  return [...arr, friendName];
}

person.friends = addFriend(person.friends, "Joey");
console.log(person);

/*
Notes : 

*) In OOP many times the actual modification of the sate. like your side-effect that you are creating 
is going to be push down as low as possible. into the actual model or the object that way you don't have to mentally think about it 
when you are writing a code.

*) But with functional programming we wanna take the opposite approach. we want as many pure functions as possible. and you want your
side effects or the mutation and changes to be pulled up as high as possible. So in functional programming you wanna make your 
impure function at the very top level. and you want as many pure function as possible underneath that impure function.

*/
