const inputElement = document.querySelector("#equation");
const outputElement = document.querySelector("#results");
const form = document.querySelector("#equation-form");

const MULTIPLY_DIVIDE_REGEX =
  /(?<operand1>\S+)\s*(?<operation>[*/])\s*(?<operand2>\S+)/;
// [] bracket escape the special characters. we don't have to give escape carcter.
// () groups the values.
//  ?<operation> gives names to the groups.

const ADD_SUBTRACT_REGEX =
  /(?<operand1>\S+)\s*(?<operation>(?<!e)[\+\-])\s*(?<operand2>\S+)/;

const EXPONENT_REGEX =
  /(?<operand1>\S+)\s*(?<operation>(?<!e)\^)\s*(?<operand2>\S+)/;

const PARENTHESIS_REGEX = /\((?<equation>[^\(\)]*)\)/;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const result = parse(inputElement.value);
  outputElement.textContent = result;
});

function parse(equation) {
  if (equation.match(PARENTHESIS_REGEX)) {
    const subEquation = equation.match(PARENTHESIS_REGEX).groups.equation;
    const result = parse(subEquation);
    const newEquation = equation.replace(PARENTHESIS_REGEX, result);
    return parse(newEquation);
  } else if (equation.match(EXPONENT_REGEX)) {
    const result = handleMath(equation.match(EXPONENT_REGEX).groups);
    const newEquation = equation.replace(EXPONENT_REGEX, result);
    return parse(newEquation);
  } else if (equation.match(MULTIPLY_DIVIDE_REGEX)) {
    const result = handleMath(equation.match(MULTIPLY_DIVIDE_REGEX).groups);
    const newEquation = equation.replace(MULTIPLY_DIVIDE_REGEX, result);
    return parse(newEquation);
  } else if (equation.match(ADD_SUBTRACT_REGEX)) {
    const result = handleMath(equation.match(ADD_SUBTRACT_REGEX).groups);
    const newEquation = equation.replace(ADD_SUBTRACT_REGEX, result);
    return parse(newEquation);
  } else {
    return parseFloat(equation);
  }
}

function handleMath({ operand1, operand2, operation }) {
  const number1 = parseFloat(operand1);
  const number2 = parseFloat(operand2);

  switch (operation) {
    case "*":
      return number1 * number2;
    case "/":
      return number1 / number2;
    case "+":
      return number1 + number2;
    case "-":
      return number1 - number2;
    case "^":
      return number1 ** number2;
  }
}
