//filter
function filterBraceNum(str) {
  const data = [];
  let tmpNum = [];
  for (let x of str.split("")) {
    if (x === "[") data.push("[");
    else if (x === "]") {
      if (tmpNum.length) {
        data.push(tmpNum.join(""));
        tmpNum = [];
      }
      data.push("]");
    } else if (x === ",") {
      if (tmpNum.length) {
        data.push(tmpNum.join(""));
        tmpNum = [];
      }
    } else tmpNum.push(x);
  }
  return data;
}

exports.filterBraceNuM = filterBraceNum;
