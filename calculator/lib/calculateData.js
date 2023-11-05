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

module.exports = calculate;
