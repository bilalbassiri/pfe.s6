const isCorrectName = name => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return Array.from(name).map(v => letters.includes(v)).indexOf(false) === -1
}

const setFormErrors = (values, setErrorMessages) => {
    let { first_name, last_name, email, old_password, new_password } = values;
    const getSyntaxError = name => (name.length > 15 && 'Must be less than 15 letters') || (!isCorrectName(name.toLowerCase()) && 'Use only letters')
    const getEmailError = _email => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(_email)
    setErrorMessages({
        firstNameErr: (!first_name && 'Enter your first name') || getSyntaxError(first_name),
        lastNameErr: (!last_name && 'Enter your last name') || getSyntaxError(last_name),
        emailErr: (!email && 'Enter your new email address') || (!getEmailError(email) && 'Invalid email address'),
        oldPasswordErr: new_password ? ( !old_password && 'Enter your password') || (old_password.length < 8 && 'Your password is incorrect. Try again') : false,
        newPasswordErr: old_password ? ( !new_password && 'Enter your new password') || (new_password.length < 8 && 'Use 8 characters or more for your password') : false,
    })
}

const isValidatedForm = (errors) => {
    const { firstNameErr, lastNameErr, emailErr, oldPasswordErr, newPasswordErr } = errors;
    return Object.entries(errors).length ? !Boolean(firstNameErr || lastNameErr || emailErr || oldPasswordErr || newPasswordErr) : false;
}

export {
    setFormErrors,
    isValidatedForm
}