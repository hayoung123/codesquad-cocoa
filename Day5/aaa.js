function getDataArr(string) {
  return string.split("");
}

function braceChecker(braceArr) {
  let stack = [];
  for (let i of braceArr) {
    let lastItem = stack[stack.length - 1];
    if (i === "[") {
      stack.push(i);
    } else {
      if (lastItem === "[") {
        stack.pop();
      } else {
        console.log("여는 괄호가 일치하지 않습니다.");
      }
    }
  }
  if (stack.length !== 0) {
    console.log("닫는 괄호가 일치하지 않습니다.");
  } else {
    console.log("괄호 매칭이 맞습니다!");
    return true;
  }
}

function printInfo(string) {
  const dataArr = getDataArr(string);

  const braceArr = dataArr.filter(function (item) {
    return item === "[" || item === "]";
  });
  const valueArr = dataArr.filter(function (item) {
    return item !== "," && item !== "[" && item !== "]";
  });
  console.log(
    `깊이 수준은 ${braceArr.length / 2}이며, 총 ${
      valueArr.length
    }개의 원소가 포함되어 있습니다.`
  );
}

function main(string) {
  const dataArr = getDataArr(string);

  const braceArr = dataArr.filter(function (item) {
    return item === "[" || item === "]";
  });

  if (braceChecker(braceArr)) {
    printInfo(string);
  }
}

const data1 = "[[1], [3]]";
main(data1);

const data2 = "[1,2,[3,4,[5,[6]]";
main(data2);
