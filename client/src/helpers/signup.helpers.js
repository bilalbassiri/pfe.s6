import {
  isCorrectName,
  getEmailError,
  getUsernameError,
  isValidatedForm,
} from "./global.helpers";

const setFormErrors = (values) => {
  let { first_name, last_name, username, email, password, confirmPassword } =
    values;
  const getSyntaxError = (name) =>
    (name.length > 15 && "Must be less than 15 letters") ||
    (!isCorrectName(name.toLowerCase()) && "Use only letters");
  // Generate Errors
  const errors = {
    firstNameErr:
      (!first_name && "Enter first name") || getSyntaxError(first_name),
    lastNameErr: (!last_name && "Enter last name") || getSyntaxError(last_name),
    usernameErr:
      (!username && "Enter your unique username") ||
      (!getUsernameError(username) &&
        "Don't use symbols, uppercase letters, more than 15 or less than 3 letters"),
    emailErr:
      (!email && "Enter email address") ||
      (!getEmailError(email) && "Invalid email address"),
    passwordErr:
      (!password && "Enter a password") ||
      (password.length < 8 && "Use 8 characters or more for your password"),
    confirmPasswordErr:
      (!confirmPassword && "Confirm your password") ||
      (confirmPassword &&
        password &&
        password !== confirmPassword &&
        "Passwords didn’t match. Try again."),
  };
  const valid = isValidatedForm(errors);
  return {
    errors,
    valid,
  };
};
export { setFormErrors };
