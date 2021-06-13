import types from "../constants/action.types";
const { GET_REVIEWS, ADD_NEW_REVIEW, REMOVE_REVIEW, SET_REVIEWS_LOADING } =
  types;

const reviewReducer = (
  state = { all: null, loading: true },
  { type, payload }
) => {
  switch (type) {
    case SET_REVIEWS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_REVIEWS:
      return {
        all: payload,
        loading: false,
      };
    case ADD_NEW_REVIEW:
      return {
        all: [payload, ...state.all],
        loading: false,
      };
    case REMOVE_REVIEW:
      console.log(payload);
      return {
        all: state.all.filter((review) => review._id !== payload._id),
        loading: false,
      };
    default:
      return state;
  }
};

export default reviewReducer;
