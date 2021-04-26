import actionTypes from '../contants/action.types';

const initialState = null;
const { LOG_IN, LOG_OUT, SIGN_UP } = actionTypes;

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOG_IN:
            return {
                credentials: payload
            };
        case LOG_OUT:
            return {
                credentials: null
            }
        case SIGN_UP:
            return {
                credentials: payload
            };
        default:
            return state;
    }
}

export default userReducer;