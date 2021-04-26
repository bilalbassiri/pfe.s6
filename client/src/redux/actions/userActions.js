import actionTypes from '../contants/action.types';
const { LOG_IN, LOG_OUT, SIGN_UP } = actionTypes;

const userLogin = payload => ({ type: LOG_IN, payload })
const userLogout = () => ({ type: LOG_OUT })
const userSignUp = payload => ({ type: SIGN_UP, payload })

export {
    userLogin,
    userSignUp,
    userLogout
}