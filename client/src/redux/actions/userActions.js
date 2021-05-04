import types from '../constants/action.types';
const {
    LOG_IN,
    LOG_OUT,
    SIGN_UP,
    REFRESH,
    CART_ADD_REMOVE,
    WISHLIST_ADD_REMOVE
} = types;

const userLogin = payload => ({ type: LOG_IN, payload })
const userLogout = () => ({ type: LOG_OUT })
const userSignUp = payload => ({ type: SIGN_UP, payload })
const userSetAccessToken = payload => ({ type: REFRESH, payload })
const cartAddRemoveItem = payload => ({ type: CART_ADD_REMOVE, payload })
const wishlistAddRemoveItem = payload => ({type: WISHLIST_ADD_REMOVE, payload});

export {
    userLogin,
    userSignUp,
    userLogout,
    userSetAccessToken,
    cartAddRemoveItem,
    wishlistAddRemoveItem
}