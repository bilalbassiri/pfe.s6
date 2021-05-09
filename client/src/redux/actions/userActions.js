import types from '../constants/action.types';
const {
    LOG_IN,
    LOG_OUT,
    SIGN_UP,
    REFRESH,
    CART_ADD_REMOVE,
    FAVORIS_ADD_REMOVE,
    CHANGE_AVATAR
} = types;

const userLogin = payload => ({ type: LOG_IN, payload })
const userLogout = () => ({ type: LOG_OUT })
const userSignUp = payload => ({ type: SIGN_UP, payload })
const userSetAccessToken = payload => ({ type: REFRESH, payload })
const cartAddRemoveItem = payload => ({ type: CART_ADD_REMOVE, payload })
const favorisAddRemoveItem = payload => ({ type: FAVORIS_ADD_REMOVE, payload });
const updateItemQuantity = (payload, action) => ({ type: action, payload });
const changeUserAvatar = (payload) => ({ type: CHANGE_AVATAR, payload })
export {
    userLogin,
    userSignUp,
    userLogout,
    userSetAccessToken,
    cartAddRemoveItem,
    favorisAddRemoveItem,
    updateItemQuantity,
    changeUserAvatar
}