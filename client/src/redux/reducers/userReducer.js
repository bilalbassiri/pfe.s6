import types from '../constants/action.types';
const { LOG_IN,
    LOG_OUT,
    REFRESH,
    SIGN_UP,
    CART_ADD_REMOVE,
    FAVORIS_ADD_REMOVE,
    QUANTITY_DECREMENT,
    QUANTITY_INCREMENT
} = types;

const initialState = {
    credentials: null,
    accessToken: null,
    cart: [],
    favoris: [],
    notifications: [],
    to_read: [],
    currently_reading: [],
    read: []
}
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
                read
            } = payload;
            return {
                credentials: {
                    _id,
                    name,
                    password,
                    email,
                    picture,
                    createdAt,
                    role
                },
                cart,
                favoris,
                notifications,
                to_read,
                currently_reading,
                read
            };
        case LOG_OUT:
            return initialState;
        case SIGN_UP:
            return {
                ...state,
                credentials: payload.credentials,
                accessToken: payload.ACCESS_TOKEN
            };
        case CART_ADD_REMOVE:
            return {
                ...state,
                cart: payload
            };
        case FAVORIS_ADD_REMOVE:
            return {
                ...state,
                favoris: payload
            };
        case QUANTITY_DECREMENT:
            const dec_cart = state.cart.map(item => {
                if (item._id === payload._id) {
                    item = { ...item, inCart: item.inCart - 1 }
                }
                return item
            })
            return {
                ...state,
                cart: dec_cart
            }
        case QUANTITY_INCREMENT:
            console.log(state.cart)
            const inc_cart = state.cart.map(item => {
                if (item._id === payload._id) {
                    item = { ...item, inCart: item.inCart + 1 }
                }
                return item
            })
            return {
                ...state,
                cart: inc_cart
            }
        case REFRESH:
            return { ...state, accessToken: payload };
        default:
            return state;
    }
}

export default userReducer;