import types from '../constants/action.types';
const { LOG_IN, LOG_OUT, REFRESH, SIGN_UP } = types;

const userReducer = (state = {credentials: null, accessToken: null}, { type, payload }) => {
    switch (type) {
        case LOG_IN:
            return {
                credentials: payload
            };
        case LOG_OUT:
            return {
                credentials: null,
                accessToken: null
            };
        case SIGN_UP:
            return {
                credentials: payload.credentials,
                accessToken: payload.ACCESS_TOKEN
            };
        case REFRESH:
            return { ...state, accessToken: payload };
        default:
            return state;
    }
}

export default userReducer;