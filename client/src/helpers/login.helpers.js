const getLoginError = values => {
    const { email, password } = values;
    const str = (!email && !password && 'email address and password')
        || (email && !password && 'password')
        || (!email && password && 'email address')
    return {
        message: 'Enter your ' + str + ' please!',
        noErrors: !str
    }
}
const startLoading = (setterCallback, time = 2000) => setTimeout(() => { setterCallback(false) }, time)

export {
    getLoginError,
    startLoading
}