const [LEFT_BRACKET, RIGHT_BRACKET, COMMA, BLANK] = ["[", "]", ",", " "];

function isQuote(ch) {
  ch === SINGLE_QUOTE || ch === DOUBLE_QUOTE ? true : false;
}

function tokenizer(str) {
  const tokenArr = [];
  let token = "";
  const bracketStack = [];

  tokenArr.push(str.charAt(0));
  for (let i = 1; i < str.length - 1; i++) {
    const ch = str.charAt(i);

    if (ch === BLANK) continue;
    if (ch === LEFT_BRACKET) bracketStack.push(ch);
    if (ch === RIGHT_BRACKET) bracketStack.pop();
    if (ch === COMMA) {
      if (bracketStack.length === 0) {
        tokenArr.push(token);
        token = "";
        continue;
      }
    }
    token += ch;
  }
  tokenArr.push(token);
  tokenArr.push(str.charAt(str.length - 1));
  return tokenArr;
}

function getType(token) {
  const isLeftBracket = token === "[" ? "leftBracket" : false;
  const isRightBracket = token === "]" ? "rightBracket" : false;
  const isArray =
    token.charAt(0) === "[" && token.charAt(token.length - 1) === "]"
      ? true
      : false;
  const isNumber = Number(token);

  const result = isLeftBracket
    ? "LEFT_BRACKET"
    : isRightBracket
    ? "RIGHT_BRACKET"
    : isArray
    ? "ARRAY"
    : isNumber
    ? "NUMBER"
    : "STRING";
  return result;
}

function lexer(tokenArr) {
  return tokenArr.map(function (v) {
    return { type: getType(v), value: v };
  });
}

function filterBracket(token) {
  return token.type !== "LEFT_BRACKET" && token.type !== "RIGHT_BRACKET";
}

function parser(lexerArr) {
  // const root = { type: "root", child: [] };
  return {
    type: "array",
    child: lexerArr.filter(filterBracket).map(function (v) {
      let { type, value } = v;

      if (type === "ARRAY") {
        return parser(lexer(tokenizer(value)));
      } else return { type, value, child: [] };
    }),
  };
}

function run(data) {
  let result = parser(lexer(tokenizer(data)));
  result = { type: "root", child: result };
  console.dir(result, { depth: null });
}

run("[1,2,[3,4,[5,[6]]]]", "CASE1");
