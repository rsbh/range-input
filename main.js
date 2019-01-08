const inputBox = document.getElementById("input-box");

const flatArr = arr => arr.reduce((acc, val) => acc.concat(val), []);

const rangeParser = value => {
  if (value.indexOf("-") > -1) {
    const range = value.split("-");
    const start = Number(range[0]);
    const end = Number(range[1]);
    const list = [];
    for (let i = start; i <= end; i++) {
      list.push(i);
    }
    return list;
  }
  return null;
};

const commaParser = value => {
  if (value.indexOf(",") > -1) {
    return flatArr(value.split(",").map(getValues));
  }
  return null;
};

const numberParser = value => {
  const num = Number(value);
  return [num];
};

const anyOneParserFactory = (...parsers) => input =>
  parsers.reduce((accum, parser) => (accum === null ? parser(input) : accum), null);
const getValues = anyOneParserFactory(commaParser, rangeParser, numberParser);

const handleInputChange = event => {
  const value = event.target.value;
  const valueArr = getValues(value);
  console.log(valueArr);
};

// inputBox.addEventListener("change", handleInputChange);

module.exports = {
  getValues
};
