const inputBox = document.getElementById("input-box");

const getValues = value => {
  console.log(value);
  if (value.indexOf(",") > -1) {
    return value.split(",").map(Number);
  } else if (value.indexOf("-") > -1) {
    const range = value.split("-");
    const start = Number(range[0]);
    const end = Number(range[1]);
    const list = [];
    for (let i = start; i <= end; i++) {
      list.push(i);
    }
    return list;
  }
  const num = Number(value);
  return [num];
};

const handleInputChange = event => {
  const value = event.target.value;
  const valueArr = getValues(value);
  console.log(valueArr);
};

inputBox.addEventListener("change", handleInputChange);
