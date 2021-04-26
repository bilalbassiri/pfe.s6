import actionTypes from '../contants/action.types';
const initialState = null

const categoryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.SET_CATEGORIES:
            return {
                allCategories: payload
            };
        default:
            return state;
    }
}

export default categoryReducer;