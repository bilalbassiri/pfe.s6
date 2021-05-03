import types from '../constants/action.types';
const { GET_REVIEWS, ADD_NEW_REVIEW } = types;


const reviewReducer = (state = { all: null, loading: true }, { type, payload }) => {
    switch (type) {
        case GET_REVIEWS:
            return {
                all: payload,
                loading: false
            };
        case ADD_NEW_REVIEW:
            console.log(1)
            return {
                all: [payload, ...state.all],
                loading: false
            };
        default:
            return state;
    }
}

export default reviewReducer;