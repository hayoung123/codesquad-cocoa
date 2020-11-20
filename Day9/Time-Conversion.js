function timeConversion(s) {
  const amPm = s.slice(8);
  let hour = Number(s.slice(0, 2));
  if (amPm === "AM") {
    if (hour === 12) return "00" + s.slice(2, 8);
    else return s.slice(0, 8);
  } else {
    if (hour === 12) return s.slice(0, 8);
    else return hour + 12 + s.slice(2, 8);
  }
}
