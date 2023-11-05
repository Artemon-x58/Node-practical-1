class Calculator {
  constructor(operation, numbers) {
    this.operation = operation;
    this.numbers = numbers;
  }
  init = () => {
    return this.calculate(this.operation, this.numbers);
  };
  calculate = (op, numbersArr) => {
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
}
const [operation, ...args] = process.argv.slice(2);
const numbers = args.map((arg) => Number(arg));
module.exports = new Calculator(operation, numbers);
