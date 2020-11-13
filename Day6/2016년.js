function solution(a, b) {
  const DAYS = ["FRI", "SAT", "SUN", "MON", "TUE", "WED", "THU"];
  const MONTH_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  //year주어지면 %4해서 윤년 체크하면 될듯
  // const MONTH=[31,28,31,30,31,30,31,31,30,31,30,31]
  let days = 0;
  for (let i = 0; i < a - 1; i++) {
    days += MONTH_LEAP[i];
  }
  days += b;
  return DAYS[(days - 1) % 7];
}
