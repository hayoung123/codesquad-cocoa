const reverse = (x) => {
  const limit = Math.pow(2, 31);
  const k = x > 0 ? 1 : -1;
  const reversed = (x * k + "").split("").reverse().join("") * k;
  return reversed > limit || reversed < limit * -1 ? 0 : reversed;
};
