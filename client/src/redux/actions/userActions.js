import types from '../constants/action.types';
const { LOG_IN, LOG_OUT, SIGN_UP, REFRESH } = types;

const userLogin = payload => ({ type: LOG_IN, payload })
const userLogout = () => ({ type: LOG_OUT })
const userSignUp = payload => ({ type: SIGN_UP, payload })
const userSetAccessToken = payload => ({ type: REFRESH, payload })
export {
    userLogin,
    userSignUp,
    userLogout,
    userSetAccessToken
}