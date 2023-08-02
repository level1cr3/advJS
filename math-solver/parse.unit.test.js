import parse from "./parse.js";

describe("#parse", () => {
  test("Add and subtract", () => {
    expect(parse("3 + 1")).toBe(4);
    expect(parse("3 - 1")).toBe(2);
    expect(parse("4 - 5")).toBe(-1);
  });

  test("multiply and divide", () => {
    expect(parse("3 * 2")).toBe(6);
    expect(parse("4 / 2")).toBe(2);
  });

  test("PARENTHESIS", () => {
    expect(parse("(3 + 1) * 2")).toBe(8);
  });

  test("EXPONENT", () => {
    expect(parse("3 ^ 2")).toBe(9);
  });

  describe("with very large numbers", () => {
    test("it returns the correct result in scientific notation", () => {
      expect(parse("10 ^ 30")).toBe(1e30);
    });
  });

  describe("with very small numbers", () => {
    test("it returns the correct result in scientific notation", () => {
      expect(parse("10 ^ -30")).toBe(1e-30);
    });
  });

  describe("with malformed equation", () => {
    test("it returns NAN", () => {
      expect(parse("abc")).toBeNaN();
    });
  });
});

// you wanna cover all the edge cases.
// you think of all the issue that you run into while developing the solution. like large number, small number.
// having 100% test coverage doesn't mean you have covered all the edge cases.
