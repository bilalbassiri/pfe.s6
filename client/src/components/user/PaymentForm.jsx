import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { userMakePayment } from "../../helpers/axios.helpers";
import { makeOrder } from "../../helpers/axios.helpers";
import { useDispatch } from "react-redux";
import { newPayedAmount } from "../../redux/actions/userActions";
import RecievedOrder from "./RecievedOrder";
import { CircularProgress, CustomizedButton, CustomizedInput } from "..";

const PaymentForm = () => {
  const { accessToken, credentials, cart } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [orderState, setOrderState] = useState({
    sending: false,
    recieved: false,
    error: false,
    content: {},
  });
  const getTotal = () => {
    let total = 0;
    for (let item of cart) {
      total += item.inCart * item.price;
    }
    return parseFloat(total.toFixed(2));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setOrderState({ ...orderState, sending: true });
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (error) {
      console.log(error.message);
      return;
    }
    const { id } = paymentMethod;
    const data = await userMakePayment({
      id,
      amount: getTotal() * 100,
    });
    if (data.success) {
      const { newCart, payed, orders, result } = await makeOrder(
        {
          _id: credentials._id,
          payed: credentials.payed,
          orders: credentials.orders,
        },
        cart,
        getTotal(),
        accessToken
      );
      if (result) {
        dispatch(newPayedAmount({ newCart, payed, orders }));
        setOrderState({
          sending: false,
          recieved: true,
          content: result,
        });
      }
    }
  };
  return orderState.recieved ? (
    <RecievedOrder order={orderState.content} />
  ) : (
    <div className="payment">
      <form onSubmit={handleSubmit}>
        <CustomizedInput
          required
          label="Address"
          variant="outlined"
          type="text"
        />
        <CustomizedInput
          required
          label="Country"
          variant="outlined"
          type="text"
        />
        <CustomizedInput required label="Phone" variant="outlined" type="tel" />
        <CardElement className="card-element" />
        <CustomizedButton
          style={{
            borderRadius: 20,
            width: "50%",
            backgroundColor: "#2a9d8f",
            "&:hover": {
              backgroundColor: "#1f776d",
            },
          }}
          type="submit"
          disabled={orderState.sending}
        >
          {orderState.sending ? (
            <CircularProgress
              plan={{ h: 24, w: 24 }}
              size={{ width: 24, height: 24 }}
            />
          ) : (
            "Pay"
          )}
        </CustomizedButton>
      </form>
    </div>
  );
};
export default PaymentForm;
