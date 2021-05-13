
const isValidatedForm = (errors) => {
    const { firstNameErr, lastNameErr, emailErr, passwordErr, confirmPasswordErr } = errors;
    return Object.entries(errors).length ? !Boolean(firstNameErr || lastNameErr || emailErr || passwordErr || confirmPasswordErr) : false;
}
const isCorrectName = name => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return Array.from(name).map(v => letters.includes(v)).indexOf(false) === -1
}
const setFormErrors = (values, setErrorMessages) => {
    let { first_name, last_name, email, password, confirmPassword } = values;
    const getSyntaxError = name => (name.length > 15 && 'Must be less than 15 letters') || (!isCorrectName(name.toLowerCase()) && 'Use only letters')
    const getEmailError = _email => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(_email)
    setErrorMessages({
        firstNameErr: (!first_name && 'Enter first name') || getSyntaxError(first_name),
        lastNameErr: (!last_name && 'Enter last name') || getSyntaxError(last_name),
        emailErr: (!email && 'Enter email address') || (!getEmailError(email) && 'Invalid email address'),
        passwordErr: (!password && 'Enter a password') || (password.length < 8 && 'Use 8 characters or more for your password'),
        confirmPasswordErr: (!confirmPassword && 'Confirm your password') || (confirmPassword && password && (password !== confirmPassword) && 'Passwords didn’t match. Try again.')
    })
}
export {
    setFormErrors,
    isValidatedForm,
}