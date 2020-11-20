function kangaroo(x1, v1, x2, v2) {
  if (x1 > x2) {
    let tmp = x1;
    x1 = x2;
    x2 = tmp;
    tmp = v1;
    v1 = v2;
    v2 = tmp;
  }
  let i = 0;
  if (v2 >= v1) return "NO";
  while (true) {
    let first = x1 + v1 * i;
    let second = x2 + v2 * i;
    if (first === second) return "YES";
    else if (first > second) return "NO";
    i++;
  }
}
