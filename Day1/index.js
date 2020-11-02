//다각형 넓이 구하기
let executionSequence = [];

function getCircle(radius, maxRadius = radius) {
  //   if (arguments.length === 0) return console.log("need a radius");
  //   if (radius > maxRadius) return console.log("error");
  const PI = Math.PI;
  let sumArea = 0;
  while (radius <= maxRadius) {
    let area = PI * Math.pow(radius, 2);
    sumArea += area;
    radius++;
  }
  executionSequence.push(`circle:${sumArea}`);
  return console.log(`total circle area : ${sumArea}`);
}

function getRect(row, column) {
  //   if (row === undefined || column === undefined)
  //     return console.log("need row or column");
  const area = row * column;
  console.log(`rectangle area : ${area}`);
  executionSequence.push(`rect:${area}`);
  return area;
}

function getTrapezoid(upperRow, lowerRow, column) {
  //   if (upperRow === undefined || lowerRow === undefined || column === undefined)
  //     return console.log("need row or column");
  const area = ((upperRow + lowerRow) * column) / 2;
  console.log(`trapezoid area : ${area}`);
  executionSequence.push(`trapezoid:${area}`);
  return area;
}

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
