# 코드스쿼드 마스터즈 코코아 JS

## Daily Mission

getArea 함수를 만들어 여러 도형의 넓이를 구하여라.

---

## Code

```javascript
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
  executionSequence.push(`circle:${sumArea}`);
  return console.log(`total circle area : ${sumArea}`);
}

//사각형 넓이구하기
function getRect(row, column) {
  const area = row * column;
  console.log(`rectangle area : ${area}`);
  executionSequence.push(`rect:${area}`);
  return area;
}

//사다리꼴 넓이 구하기
function getTrapezoid(upperRow, lowerRow, column) {
  const area = ((upperRow + lowerRow) * column) / 2;
  console.log(`trapezoid area : ${area}`);
  executionSequence.push(`trapezoid:${area}`);
  return area;
}
//다각형 넓이구하는 함수
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

//계산 수행 순서
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
```

---

## 수행결과

![image](https://user-images.githubusercontent.com/67357426/97850246-15bc4980-1d37-11eb-9034-0d0bd9dd23fc.png)
