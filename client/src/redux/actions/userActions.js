import types from "../constants/action.types";
const {
  LOG_IN,
  LOG_OUT,
  REFRESH,
  CART_ADD_REMOVE,
  FAVORIS_ADD_REMOVE,
  CHANGE_AVATAR,
  UPDATE_USER_CREDENTIALS,
  UPDATE_READING_LIST,
  HANDLE_ORDER_DONE,
  OPEN_NOTIFICATIONS,
} = types;

const userLogin = (payload) => ({ type: LOG_IN, payload });
const userLogout = () => ({ type: LOG_OUT });
const userSetAccessToken = (payload) => ({ type: REFRESH, payload });
const cartAddRemoveItem = (payload) => ({ type: CART_ADD_REMOVE, payload });
const favorisAddRemoveItem = (payload) => ({
  type: FAVORIS_ADD_REMOVE,
  payload,
});
const updateItemQuantity = (payload, action) => ({ type: action, payload });
const changeUserAvatar = (payload) => ({ type: CHANGE_AVATAR, payload });
const updateUserCredentials = (payload) => ({
  type: UPDATE_USER_CREDENTIALS,
  payload,
});
const switchReadingList = (payload) => ({ type: UPDATE_READING_LIST, payload });
const newPayedAmount = (payload) => ({ type: HANDLE_ORDER_DONE, payload });
const readNotifications = (payload) => ({ type: OPEN_NOTIFICATIONS });

export {
  userLogin,
  userLogout,
  userSetAccessToken,
  cartAddRemoveItem,
  favorisAddRemoveItem,
  updateItemQuantity,
  changeUserAvatar,
  updateUserCredentials,
  switchReadingList,
  newPayedAmount,
  readNotifications
};
