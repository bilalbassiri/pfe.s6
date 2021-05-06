import React from 'react'
import { useSelector } from 'react-redux';
import { CircularProgress, CartItem } from '..';

const Cart = () => {
    const { cart } = useSelector(state => state.user);
    const getTotal = () => {
        let total = 0;
        for (let item of cart) {
            total += item.inCart * item.price
        }
        return total;
    }
    return (
        cart.length ?
            <div className="cart-container">
                {
                    cart.map(item => <CartItem key={item._id} item={item} />)
                }
                <h1>
                    {getTotal()}
                </h1>
            </div>
            :
            <h1>
                Empty
            </h1>
    )
}
export default Cart