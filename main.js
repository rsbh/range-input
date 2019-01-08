const flatArr = arr => arr.reduce((acc, val) => acc.concat(val), []);

let itemlist = [];
let duplicates = [];

const rangeParser = value => {
  if (value.indexOf("-") > -1) {
    const range = value.split("-");
    const start = Number(range[0]);
    const end = Number(range[1]);
    const list = [];
    for (let i = start; i <= end; i++) {
      list.push(i);
    }
    return list.length ? list : null;
  }
  return null;
};

const commaParser = value => {
  if (value.indexOf(",") > -1) {
    const result = value
      .split(",")
      .map(getValues)
      .filter(num => num !== null);
    return flatArr(result);
  }
  return null;
};

const numberParser = value => {
  const num = Number(value);
  return isNaN(num) ? null : [num];
};

const anyOneParserFactory = (...parsers) => input =>
  parsers.reduce((accum, parser) => (accum === null ? parser(input) : accum), null);
const getValues = anyOneParserFactory(commaParser, rangeParser, numberParser);

const addItemToList = (items, list, duplicates) => {
  const itemslist = [...list];
  const duplicatesList = [...duplicates];
  items &&
    items.forEach(item => {
      if (list.indexOf(item) > -1) {
        duplicatesList.push(item);
      } else {
        itemslist.push(item);
      }
    });
  return { itemslist, duplicatesList };
};

const makeList = array => {
  const list = document.createElement("ul");

  array.forEach(item => {
    const el = document.createElement("li");
    el.appendChild(document.createTextNode(item));
    list.appendChild(el);
  });

  return list;
};

const handleInputChange = event => {
  const value = event.target.value;
  const valueArr = getValues(value);
  const data = addItemToList(valueArr, itemlist, duplicates);

  itemlist = data.itemslist;
  duplicates = data.duplicatesList;

  const finalListDiv = document.getElementById("final-list");

  if (finalListDiv.hasChildNodes()) {
    finalListDiv.removeChild(finalListDiv.childNodes[0]);
  }
  finalListDiv.appendChild(makeList(itemlist));

  const duplicatesListDiv = document.getElementById("duplicates-list");
  if (duplicatesListDiv.hasChildNodes()) {
    duplicatesListDiv.removeChild(duplicatesListDiv.childNodes[0]);
  }
  duplicatesListDiv.appendChild(makeList(duplicates));

  event.target.value = "";
};

document.addEventListener("DOMContentLoaded", function() {
  const inputBox = document.getElementById("input-box");
  inputBox.addEventListener("change", handleInputChange);
});

window.module = window.module || {};

module.exports = {
  getValues,
  addItemToList
};
