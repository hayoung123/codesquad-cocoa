// function foo(name) {
//   this.name = name;
// }
// foo.prototype.getName = function () {
//   console.log(this.name);
// };

// function bar(name) {
//   this.name = name;
//   this.getName = function () {
//     console.log(this.name);
//   };
// }

// class Mov {
//   constructor(name) {
//     this.name = name;
//   }
//   getName() {
//     console.log(this.name);
//   }
// }

// const kim = new foo("kim");
// kim.getName();
// const park = new foo("park");
// park.getName();
// console.log(kim.getName === park.getName);
// const kyle = new bar("kyle");
// kyle.getName();
// const alex = new bar("alex");
// alex.getName();
// console.log(kyle.getName === alex.getName);

// const john = new Mov("john");
// const kelly = new Mov("kelly");
// john.getName();
// kelly.getName();
// console.log(john.getName === kelly.getName);

function getItems(board, index) {
  let item;
  let isItem = false;
  for (let i = 0; i < board.length; i++) {
    if (board[i][index] !== 0 && isItem === false) {
      item = board[i][index];
      board[i][index] = 0;
      isItem = true;
      return item;
    }
  }
}

function bomb(items) {
  let count = 0;
  items = items.filter(function (v) {
    return v != null;
  });
  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i] === items[i - 1]) {
      items.splice(i - 1, 1);
      items.splice(i - 1, 1);
      count += 2;
    }
  }
  return [items, count];
}

function solution(board, moves) {
  let result = 0;
  let items = [];
  moves.forEach(function (index) {
    // console.log(board, index) // board 알아서 변함
    items.push(getItems(board, index - 1));
  });
  // console.log(board)
  // console.log(items)

  while (bomb(items)[1]) {
    [items, count] = bomb(items);
    result += count;
  }
  // console.log(items)

  return result;
}

console.log(
  solution(
    [
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4],
    ],
    [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5]
  )
);
