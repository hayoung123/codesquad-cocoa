function solution(answers) {
  const one = [1, 2, 3, 4, 5];
  const two = [2, 1, 2, 3, 2, 4, 2, 5];
  const three = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
  let score = new Array(3).fill(0);
  const bestStudents = [];

  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === one[i % one.length]) score[0]++;
    if (answers[i] === two[i % two.length]) score[1]++;
    if (answers[i] === three[i % three.length]) score[2]++;
  }
  const maxScore = Math.max.apply(null, score);

  score.forEach((v, idx) => {
    if (v === maxScore) bestStudents.push(idx + 1);
  });
  return bestStudents;
}
