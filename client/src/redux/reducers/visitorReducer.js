import actionTypes from '../contants/action.types';
const initialState = null

const visitorReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SIGN_UP:
            return {
                new_user: payload
            };
        default:
            return state;
    }
}

export default visitorReducer;