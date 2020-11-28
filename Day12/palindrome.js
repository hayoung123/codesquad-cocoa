const isPalindrome = (x) => {
  return x === (x + "").split("").reverse().join("") * 1;
};
