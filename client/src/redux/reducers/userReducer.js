import types from "../constants/action.types";
const {
  LOG_IN,
  LOG_OUT,
  REFRESH,
  CART_ADD_REMOVE,
  FAVORIS_ADD_REMOVE,
  QUANTITY_DECREMENT,
  QUANTITY_INCREMENT,
  CHANGE_AVATAR,
  UPDATE_USER_CREDENTIALS,
  UPDATE_READING_LIST,
  HANDLE_ORDER_DONE,
  OPEN_NOTIFICATIONS,
} = types;

const initialState = {
  credentials: null,
  accessToken: null,
  cart: [],
  favoris: [],
  notifications: [],
  new_notifications: [],
  to_read: [],
  currently_reading: [],
  read: [],
  genres: [],
  readers: [],
  isLoading: true,
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
        new_notifications,
        payed,
        orders,
        active,
        highlights,
        username,
        readers,
      } = payload;
      return {
        ...state,
        credentials: {
          _id,
          name,
          password,
          email,
          username,
          picture,
          createdAt,
          payed,
          role,
          orders,
          active,
        },
        cart,
        favoris,
        notifications,
        new_notifications,
        to_read,
        currently_reading,
        read,
        genres,
        highlights,
        readers,
        isLoading: false,
      };
    case LOG_OUT:
      return {
        ...initialState,
        isLoading: false,
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
    case HANDLE_ORDER_DONE:
      return {
        ...state,
        cart: payload.newCart,
        credentials: {
          ...state.credentials,
          payed: payload.payed,
          orders: payload.orders,
        },
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
    case OPEN_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...state.new_notifications, ...state.notifications],
        new_notifications: [],
      };
    case REFRESH:
      return { ...state, accessToken: payload };
    default:
      return state;
  }
};

export default userReducer;
