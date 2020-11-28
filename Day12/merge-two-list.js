const mergeTwoLists = (l1, l2) => {
  return l1.concat(l2).sort((a, b) => a - b);
};

const l1 = [];
const l2 = [0];
const k = mergeTwoLists(l1, l2);
console.log(k);
