export function getNextBirthday() {
  const now = new Date();
  let year = now.getFullYear();
  let birthday = new Date(year, 11, 30, 0, 0, 0);

  if (now > birthday) {
    birthday = new Date(year + 1, 11, 30, 0, 0, 0);
  }
  return birthday;
}
