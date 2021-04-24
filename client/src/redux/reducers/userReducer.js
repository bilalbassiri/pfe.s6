import actionTypes from '../contants/action.types';
const initialState = null

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SIGN_UP:
            return {
                crederntials: payload
            };
        default:
            return state;
    }
}

export default userReducer;