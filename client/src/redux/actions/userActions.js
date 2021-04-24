import actionTypes from '../contants/action.types';
const { SIGN_UP } = actionTypes;

const userSignUp = credentials => {
    return { type: SIGN_UP, payload: credentials }
}
export {
    userSignUp
}