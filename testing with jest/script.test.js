// we are using the node js right now.

const { sum, getLargest } = require("./script.js");

describe("#sum", () => {
  test("this adds number correctly", () => {
    const a = 1;
    const b = 2;
    expect(sum(a, b)).toBe(3);
  });
});

describe("#getLargest", () => {
  test("this finds the largest number in array", () => {
    const array = [1, 2, 3, 4, 5];
    expect(getLargest(array)).toBe(5);
  });

  describe("with an empty array", () => {
    test("it returns null", () => {
      expect(getLargest([])).toBeNull();
    });
  });
});

/*
equal vs toBe

toBe is like pass by reference.

equal is like pass by value.
*/

describe("#equal vs toBe", () => {
  test("toBe", () => {
    const obj = { a: 1, b: 2 };
    expect(obj).toBe({ a: 1, b: 2 });
  });

  test("equal", () => {
    const obj = { a: 1, b: 2 };
    expect(obj).toEqual({ a: 1, b: 2 });
  });
});
