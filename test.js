let a = [1, 2, "", 4];
function k(arr) {
  // for (let i = 0; i < arr.length; i++) {
  //   if (!arr[i]) {
  //     return false;
  //   }
  // }
  arr.forEach((v) => {
    console.log(v);
    if (!v) {
      return false;
    }
  });
  return true;
}

const res = k(a);
console.log(res);
