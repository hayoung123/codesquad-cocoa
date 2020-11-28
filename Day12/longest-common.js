const longestCommonPrefix = (strs) => {
  if (!strs.length) return "";
  if (strs.length === 1) return strs[0];
  const str = strs[0];
  strs = strs.slice(1);
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    for (let x of strs) {
      if (char !== x[i]) return stack.join("");
    }
    stack.push(char);
  }
  return stack.join("");
};
