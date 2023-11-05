// node calc.js sum 5 8 5
// node calc.js mult 4 3 1
// node calc.js sub 4 2 2
// node calc.js div 8 4 2
const [operation, ...args] = process.argv.slice(2);
const numbers = args.map((arg) => Number(arg));

const calculate = (op, numbersArr) => {
  switch (op) {
    case "sum":
      return numbersArr.reduce((acc, item) => acc + item);
    case "mult":
      return numbersArr.reduce((acc, item) => acc * item);
    case "sub":
      return numbersArr.reduce((acc, item) => acc - item);
    case "div":
      return numbersArr.reduce((acc, item) => acc / item);

    default:
      return "Unknown operation type";
  }
};

const result = calculate(operation, numbers);
console.log(result);
