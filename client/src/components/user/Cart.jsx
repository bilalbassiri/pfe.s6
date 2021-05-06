import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { CartItem, CustomizedButton } from '..';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
import { useDispatch } from 'react-redux';
import { makeOrder } from '../../helpers/requests';
import { cartAddRemoveItem } from '../../redux/actions/userActions';
import RecievedOrder from './RecievedOrder';

const styles = {
    checkOut: {
        borderRadius: 20,
        backgroundColor: '#EF7C8E',
        padding: '8.5px 16px',
        '&:hover': {
            backgroundColor: '#DA7080',
        },
        '& .arrow': {
            marginLeft: 10,
            fontSize: '1.2rem'
        }

    }
}
const Cart = () => {
    const dispatch = useDispatch();
    const { credentials, cart, accessToken } = useSelector(state => state.user);
    const [orderState, setOrderState] = useState({
        sending: false,
        recieved: false,
        content: ''
    })
    const getTotal = () => {
        let total = 0;
        for (let item of cart) {
            total += item.inCart * item.price
        }
        return total.toFixed(2);
    }
    return (
        !orderState.recieved ?
            cart.length ?
                <div className="cart-container">

                    <div className="items">
                        <h1>
                            Cart
                        </h1>
                        {
                            cart.map(item => <CartItem key={item._id} item={item} />)
                        }
                        <div className="check-out-btn cart-item">
                            <h3><span>Total </span>${getTotal()}</h3>
                            <>
                                <CustomizedButton
                                    style={styles.checkOut}
                                    type="button"
                                    color="primary"
                                    disabled={orderState.sending}
                                    onClick={
                                        () => {
                                            setOrderState({ ...orderState, sending: true })
                                            makeOrder(credentials, cart, getTotal(), accessToken).then(({ cart, result }) => {
                                                if (result) {
                                                    dispatch(cartAddRemoveItem(cart))
                                                    setOrderState({ sending: false, recieved: true, content: result })
                                                }
                                            })
                                        }
                                    }>
                                    Clear all
                                        <NearMeOutlinedIcon className="arrow" />
                                </CustomizedButton>
                            </>
                        </div>
                    </div>

                </div>
                :
                <h1>
                    empty
                </h1>
            :
            <RecievedOrder order={orderState.content} />
    )
}
export default Cart