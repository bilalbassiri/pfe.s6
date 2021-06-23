import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CartItem, CircularProgress, CustomizedButton } from "..";
import NearMeOutlinedIcon from "@material-ui/icons/NearMeOutlined";
import { useDispatch } from "react-redux";
import { makeOrder, updateCart } from "../../helpers/axios.helpers";
import { useHistory } from "react-router-dom";
import {
  cartAddRemoveItem,
  newPayedAmount,
} from "../../redux/actions/userActions";
import RecievedOrder from "./RecievedOrder";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import Fab from "@material-ui/core/Fab";

const styles = {
  checkOut: {
    borderRadius: 20,
    backgroundColor: "#2a9d8f",
    padding: "8.5px 16px",
    "&:hover": {
      backgroundColor: "#1f776d",
    },
    "& .arrow": {
      marginLeft: 10,
      fontSize: "1.2rem",
    },
  },
  clearAll: {
    borderRadius: "50%",
    backgroundColor: "white",
    height: 45,
    width: 45,
    boxShadow: "none",
    border: "1px solid #2a9d8f",
    color: "#2a9d8f",
  },
  explore: {
    margin: `10px 0px`,
    backgroundColor: "#2a9d8f",
    padding: "8px",
    borderRadius: 20,
    width: "130px",
    "&:hover": {
      backgroundColor: "#1f776d",
    },
  },
};
const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { credentials, cart, accessToken, isLoading } = useSelector(
    (state) => state.user
  );
  const [orderState, setOrderState] = useState({
    sending: false,
    recieved: false,
    content: "",
  });
  const getTotal = () => {
    let total = 0;
    for (let item of cart) {
      total += item.inCart * item.price;
    }
    return total.toFixed(2);
  };
  useEffect(() => {
    document.title = "Cart | Kafka";
  }, []);
  return !isLoading ? (
    !orderState.recieved ? (
      cart.length ? (
        <div className="cart-container">
          <div className="items">
            <h1>Cart</h1>
            {cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
            <div className="check-out-btn cart-item">
              <h3>
                <span>Total </span>${getTotal()}
              </h3>
              <div className="btn-cont">
                <Fab
                  style={styles.clearAll}
                  type="button"
                  color="secondary"
                  disabled={orderState.sending}
                  onClick={() => {
                    dispatch(cartAddRemoveItem([]));
                    updateCart([], accessToken);
                  }}
                >
                  <ClearAllIcon className="arrow" />
                </Fab>
                <CustomizedButton
                  style={styles.checkOut}
                  type="button"
                  color="primary"
                  disabled={orderState.sending}
                  onClick={() => {
                    setOrderState({ ...orderState, sending: true });
                    makeOrder(
                      {
                        _id: credentials._id,
                        payed: credentials.payed,
                        orders: credentials.orders,
                        total: credentials.total,
                      },
                      cart,
                      parseInt(getTotal()),
                      accessToken
                    ).then(({ cart, payed, orders, result }) => {
                      if (result) {
                        dispatch(newPayedAmount({ cart, payed, orders }));
                        setOrderState({
                          sending: false,
                          recieved: true,
                          content: result,
                        });
                      }
                    });
                  }}
                >
                  Check out
                  <NearMeOutlinedIcon className="arrow" />
                </CustomizedButton>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            gap: 30,
            height: "calc(100vh - 84px)",
          }}
        >
          <h2 style={{ color: "#1a535c" }}>
            Hi {credentials.name.split(" ")[0]} 👋, your cart is empty.
          </h2>
          <CustomizedButton
            disableElevation
            style={styles.explore}
            onClick={() => history.push("/search")}
          >
            Explore
          </CustomizedButton>
        </div>
      )
    ) : (
      <RecievedOrder order={orderState.content} />
    )
  ) : (
    <CircularProgress plan={{ h: "calc(100vh - 84px)", w: "100%" }} />
  );
};
export default Cart;
