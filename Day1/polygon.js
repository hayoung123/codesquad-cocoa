//다각형 넓이 구하기
let executionSequence = [];

//원 넓이 구하기
function getCircle(radius, maxRadius = radius) {
  const PI = Math.PI;
  let sumArea = 0;
  while (radius <= maxRadius) {
    let area = PI * Math.pow(radius, 2);
    sumArea += area;
    radius++;
  }
  console.log(`total circle area : ${sumArea}`);
  saveSequence(`circle:${sumArea}`);
  return sumArea;
}

//사각형 넓이 구하기
function getRect(row, column) {
  const area = row * column;
  console.log(`rectangle area : ${area}`);
  saveSequence(`rect:${area}`);
  return area;
}

//사다리꼴 넓이 구하기
function getTrapezoid(upperRow, lowerRow, column) {
  const area = ((upperRow + lowerRow) * column) / 2;
  console.log(`trapezoid area : ${area}`);
  saveSequence(`trapezoid:${area}`);
  return area;
}

//다각형 넓이 구하기
function getArea(shape, num1, num2, num3) {
  if (shape === undefined) return console.log("need shape");
  if (shape === "circle") {
    getCircle(num1, num2);
  } else if (shape === "rect") {
    getRect(num1, num2);
  } else if (shape === "trapezoid") {
    getTrapezoid(num1, num2, num3);
  }
}

//계산 수행 함수 및 값 저장
function saveSequence(str) {
  executionSequence.push(str);
}

//계산 수행
function printExecutionSequence() {
  console.log(`계산수행 : ${executionSequence.join(", ")}`);
}

function init() {
  getCircle();
  getArea("circle", 10);
  getArea("rect", 10, 15);
  getArea("trapezoid", 10, 15, 12);
  getArea("circle", 1, 2);
  printExecutionSequence();
}
init();
