function gradingStudents(grades) {
  for (let i = 0; i < grades.length; i++) {
    if (grades[i] < 38) continue;
    const multi = roundMultiple(5, grades[i]);
    if (multi - grades[i] < 3) grades[i] = multi;
  }
  return grades;
}
function roundMultiple(multi, grade) {
  let res = 0;
  while (res <= grade) {
    res += multi;
  }
  return res;
}
