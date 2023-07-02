/*
immutability: Something that cannot be mutated. which means something that cannot be changed.

example : constant variables that are 'value types' like string, integer, boolean etc.

Note : constant reference type are not immutable like array or object. because you can change things inside them

*/

// we can make an object immutable by using Object.freeze().
//  there is slight problem when using object.freeze. Is that it doesn't freeze the nested. objects or arrays.
// the reason for this is Object.freeze() only freezes one level deep.

const person = deepFreeze({
  name: "kyle",
  friends: ["jhonny, sally"],
  address: {
    street: "1234",
  },
});

person.address.street = "11";

console.log(person);

person.name = "jhon";
//person.friends.push("joey");
// so prevent to this we have use object.freeze in the array as well.
// Object.freeze() works on preety much anything

person.friends = []; // we cannot reassign them because of Object.freeze() freezes one level deep.

console.log(person);

/*
    It is kind of pain to write the objec.freeze() everytime you wanna freeze something. specially for multi nested arrays or objects.
*/

// we can write a deepFreeze function to freeze the nested objects.

function deepFreeze(object) {
  Object.values(object).forEach((value) => {
    if (value && typeof value === "object") deepFreeze(value);
  });

  return Object.freeze(object);
}

// so we can manually write the deepFreeze function or use the library that has a built in deepFreeze function in it.

/*
Note : you wanna do this if you wanna make something unchangeable.

But if you want to be able to mutate your object. essentially instead of mutating it.

> what you wanna do is create a clone. A clone that has the changes built in. which is where destructuring and spread operator come
in handy.

*/

const newPerson = deepFreeze({
  ...person,
  address: { ...person.address, street: 72 },
});

console.log(newPerson);

/*
> This may seem ridiculous super inefficient. and terrible to work with. Because you are constantly having to make changes like this.
like cloning and object to make a change.

> But by doing this it actually makes it easier to follow your code. and debug the problems that occur.
> generally whereever you have mutation and changes. that is where your bugs are going to occur. So if you limit the amout of mutaions 
you make. we will have much less area where the bugs could occur. Because your  code is going to be easier to understand and test since
there are no mutations

> also if you have person variable and you change it 15 different times inside a function it is really hard to know what the value of 
that person is at the end of that function

> but by doing this where you never actually change the variable. we know that the variable is never going to change.

> tehcnically with functional programming it is not really required that you wrap everything inside a deepfreeze. but you want to
make sure that you limit or eliminate completly the mutations that you are doing.

So even if you don't deepFreeze the person variable you wanna make sure you don't actually mutate it. instead you clone it

> by doing this you are enforcing the rule by yourself. instead of using the complier to do so.
*/
