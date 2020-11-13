function solution(n) {
  let sumDivisor = 0;
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) sumDivisor += i;
  }
  return sumDivisor;
}
