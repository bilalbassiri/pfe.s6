import types from "../constants/action.types";
const {
  LOG_IN,
  LOG_OUT,
  REFRESH,
  SIGN_UP,
  CART_ADD_REMOVE,
  FAVORIS_ADD_REMOVE,
  QUANTITY_DECREMENT,
  QUANTITY_INCREMENT,
  CHANGE_AVATAR,
  UPDATE_USER_CREDENTIALS,
  UPDATE_READING_LIST,
} = types;

const initialState = {
  credentials: null,
  accessToken: null,
  cart: [],
  favoris: [],
  notifications: [],
  to_read: [],
  currently_reading: [],
  read: [],
  genres: [],
};
const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOG_IN:
      const {
        _id,
        name,
        password,
        email,
        picture,
        createdAt,
        role,
        cart,
        favoris,
        notifications,
        to_read,
        currently_reading,
        read,
        genres,
      } = payload;
      return {
        credentials: {
          _id,
          name,
          password,
          email,
          picture,
          createdAt,
          role,
        },
        cart,
        favoris,
        notifications,
        to_read,
        currently_reading,
        read,
        genres,
      };
    case LOG_OUT:
      return initialState;
    case SIGN_UP:
      return {
        ...state,
        credentials: payload.credentials,
        accessToken: payload.ACCESS_TOKEN,
      };
    case CART_ADD_REMOVE:
      return {
        ...state,
        cart: payload,
      };
    case FAVORIS_ADD_REMOVE:
      return {
        ...state,
        favoris: payload,
      };
    case QUANTITY_DECREMENT:
      const dec_cart = state.cart.map((item) => {
        if (item._id === payload._id) {
          item = { ...item, inCart: item.inCart - 1 };
        }
        return item;
      });
      return {
        ...state,
        cart: dec_cart,
      };
    case QUANTITY_INCREMENT:
      const inc_cart = state.cart.map((item) => {
        if (item._id === payload._id) {
          item = { ...item, inCart: item.inCart + 1 };
        }
        return item;
      });
      return {
        ...state,
        cart: inc_cart,
      };
    case CHANGE_AVATAR:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          picture: payload,
        },
      };
    case UPDATE_USER_CREDENTIALS:
      return {
        ...state,
        credentials: payload,
      };
    case UPDATE_READING_LIST:
      return {
        ...state,
        read: payload.read,
        to_read: payload.to_read,
        currently_reading: payload.currently_reading,
      };
    case REFRESH:
      return { ...state, accessToken: payload };
    default:
      return state;
  }
};

export default userReducer;
