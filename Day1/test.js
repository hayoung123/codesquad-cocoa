const f1 = (input) => {
  let result;
  result = input + 1;
  return result;
};

const f2 = (input) => {
  let result;
  result = input + 2;
  return result;
};

const f3 = (input) => {
  let result;
  result = input + 3;
  return result;
};

const get_encrypted = (func) => {
  let name = "kyle";

  return function () {
    return func.call(null, name);
  };
};

let encrypted_value = get_encrypted(f1)();
console.log(encrypted_value);
encrypted_value = get_encrypted(f2)();
console.log(encrypted_value);
encrypted_value = get_encrypted(f3)();
console.log(encrypted_value);
