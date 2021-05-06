import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { cartAddRemoveItem, updateItemQuantity } from '../../redux/actions/userActions';
import { updateCart } from '../../helpers/requests';

const CartItem = ({ item: { _id, cover, name, price, author, inCart, quantity } }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { cart, accessToken } = useSelector(state => state.user)
    return (
        <div className="cart-item">
            <div>
                <div
                    className="remove-item"
                    onClick={() => {
                        const newCart = cart.filter(item => item._id !== _id);
                        dispatch(cartAddRemoveItem(newCart))
                        updateCart(newCart, accessToken)
                    }}>
                    <ClearOutlinedIcon />
                </div>
                <div className='cover'>
                    <img src={cover} alt={name} />
                </div>
                <div className="detail" onClick={() => history.push(`/book/${_id}`)}>
                    <div>
                        <h1 className="name">
                            {name}
                        </h1>
                        <h3 className="author">
                            {author}
                        </h3>
                    </div>

                    <h2 className="price">
                        {price.toFixed(2)}
                    </h2>
                </div>
            </div>
            <div className="counter">
                <button
                    type="button"
                    disabled={inCart === 1}
                    onClick={() => dispatch(updateItemQuantity({ _id }, 'QUANTITY_DECREMENT'))}>
                    <RemoveIcon />
                </button>
                <span>
                    {inCart}
                </span>
                <button
                    type="button"
                    disabled={inCart === quantity}
                    onClick={() => dispatch(updateItemQuantity({ _id }, 'QUANTITY_INCREMENT'))}>
                    <AddIcon />
                </button>
            </div>
        </div>
    )
}
export default CartItem