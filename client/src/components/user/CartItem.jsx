import React from 'react';
import {  useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { updateItemQuantity } from '../../redux/actions/userActions';

const CartItem = ({ item: { _id, cover, name, price, author, inCart, quantity } }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    return (
        <div className="cart-item">
            <div>
                <div className='cover'>
                    <img src={cover} alt={name} />
                </div>
                <div className="detail" onClick={() => history.push(`/book/${_id}`)}>
                    <h1 className="name">
                        {name}
                    </h1>
                    <h3>
                        by {author}
                    </h3>
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