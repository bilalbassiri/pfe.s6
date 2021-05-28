const getFormattedDate = (date) => {
  return new Date(date).getFullYear();
};

let getPassedTime = (played_at) => {
  let p = new Date() - new Date(played_at);
  if (p / 1000 < 60) {
    return Math.floor(p / 1000) + ` secondes ago`;
  } else if (p / 60000 < 60) {
    let s = Math.floor(p / 60000) === 1 ? "" : "s";
    return Math.floor(p / 60000) + ` minute${s} ago`;
  } else if (p / (60000 * 60) < 24) {
    let h = Math.floor(p / (60000 * 60)) === 1 ? "" : "s";
    return Math.floor(p / (60000 * 60)) + ` hour${h} ago`;
  } else if (p / (60000 * 60) < 48) {
    return "One day ago";
  } else return new Date(played_at).toDateString();
};
export { getFormattedDate, getPassedTime };
