function checkArgs(...args) {
  for (let elem of args) {
    if (elem === undefined || isNaN(Number(elem))) {
      return false;
    }
  }
  return true;
}

function getCircle(r, maxR, sum = 0) {
  const PI = Math.PI;
  if (!checkArgs(r)) return ERROR_MESSAGE;
  if (!maxR || r === maxR) return sum + r * r * PI;
  else return getCircle(r + 1, maxR, sum + r * r * PI);
}
function getRectangle(width, height) {
  if (!checkArgs(width, height)) return ERROR_MESSAGE;
  return width * height;
}
function getTrapezoid(upper, lower, height) {
  if (!checkArgs(upper, lower, height)) return ERROR_MESSAGE;
  return ((upper + lower) * height) / 2;
}
function getCylinder(r, height) {
  if (!checkArgs(r, height)) return ERROR_MESSAGE;
  const circleArea = getCircle(r);
  return circleArea * height;
}

function getArea(type, ...args) {
  switch (type) {
    case 'circle':
      executionSequence.push({ type, value: getCircle(...args) });
      return getCircle(...args);
    case 'rect':
      executionSequence.push({ type, value: getRectangle(...args) });
      return getRectangle(...args);
    case 'trapezoid':
      executionSequence.push({ type, value: getTrapezoid(...args) });
      return getTrapezoid(...args);
  }
}

function printExecutionSequence() {
  let print = '계산수행순서: ';
  executionSequence.forEach((v, idx) => {
    if (!checkArgs(v.value)) v.value = 0;
    if (idx === executionSequence.length - 1) {
      print += `${v.type}: ${v.value}`;
    } else {
      print += `${v.type}: ${v.value}, `;
    }
  });

  console.log(print);
}

const ERROR_MESSAGE = '올바른 값을 입력하세요';
const executionSequence = [];

//getArea를 통할 때만 execution에 담기게 만들어놨다.
console.log(getArea('circle', 2));
console.log(getArea('rect', 2, 3));
printExecutionSequence();
