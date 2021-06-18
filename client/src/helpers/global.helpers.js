const getFormattedDate = (date) => {
  return new Date(date).getFullYear();
};
const isCorrectName = (name) => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return (
    Array.from(name)
      .map((v) => letters.includes(v))
      .indexOf(false) === -1
  );
};
const getEmailError = (_email) =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    _email
  );
const getUsernameError = (username) => /^[a-z0-9_.]{3,15}$/.test(username);
const isValidatedForm = (errors) => {
  const {
    firstNameErr,
    lastNameErr,
    usernameErr,
    emailErr,
    oldPasswordErr,
    newPasswordErr,
  } = errors;
  return Object.entries(errors).length
    ? !Boolean(
        firstNameErr ||
          lastNameErr ||
          emailErr ||
          usernameErr ||
          oldPasswordErr ||
          newPasswordErr
      )
    : false;
};
let getPassedTime = (played_at) => {
  let p = new Date() - new Date(played_at);
  if (p / 1000 < 60) {
    return `Just now`;
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
let getKafkaRandomQuote = () => {
  // Thanks to https://www.goodreads.com/
  const quotes = [
    "I am a cage, in search of a bird.",
    "A book must be the axe for the frozen sea within us.",
    "Many a book is like a key to unknown chambers within the castle of one’s own self.",
    "Youth is happy because it has the capacity to see beauty. Anyone who keeps the ability to see beauty never grows old.",
    "Books are a narcotic.",
    "I think we ought to read only the kind of books that wound and stab us.",
    "Paths are made by walking",
    "I usually solve problems by letting them devour me.",
    "They say ignorance is bliss.... they're wrong",
    "Beyond a certain point there is no return. This point has to be reached.",
  ];
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return `“${quotes[randomIndex]}”  ― Franz Kafka`;
};
const MONTHS = [
  { index: 0, month: "Junary" },
  { index: 1, month: "February" },
  { index: 2, month: "March" },
  { index: 3, month: "April" },
  { index: 4, month: "May" },
  { index: 5, month: "June" },
  { index: 6, month: "July" },
  { index: 7, month: "August" },
  { index: 8, month: "September" },
  { index: 9, month: "October" },
  { index: 10, month: "November" },
  { index: 11, month: "December" },
];
export {
  MONTHS,
  getFormattedDate,
  isCorrectName,
  getEmailError,
  getUsernameError,
  getPassedTime,
  isValidatedForm,
  getKafkaRandomQuote,
};
