import {
  isCorrectName,
  getEmailError,
  getUsernameError,
  isValidatedForm,
} from "./global.helpers";

const setFormErrors = (values, setErrorMessages) => {
  let { first_name, last_name, username, email, old_password, new_password } =
    values;
  const getSyntaxError = (name) =>
    (name.length > 15 && "Must be less than 15 letters") ||
    (!isCorrectName(name.toLowerCase()) && "Use only letters");
  setErrorMessages({
    firstNameErr:
      (!first_name && "Enter your first name") || getSyntaxError(first_name),
    lastNameErr:
      (!last_name && "Enter your last name") || getSyntaxError(last_name),
    usernameErr:
      (!username && "Enter your unique username") ||
      (!getUsernameError(username) &&
        "Don't use symbols, uppercase letters, more than 15 or less than 3 letters"),
    emailErr:
      (!email && "Enter your new email address") ||
      (!getEmailError(email) && "Invalid email address"),
    oldPasswordErr: new_password
      ? (!old_password && "Enter your password") ||
        (old_password.length < 8 && "Your password is incorrect. Try again")
      : false,
    newPasswordErr: old_password
      ? (!new_password && "Enter your new password") ||
        (new_password.length < 8 &&
          "Use 8 characters or more for your password")
      : false,
  });
};

export { setFormErrors, isValidatedForm };
