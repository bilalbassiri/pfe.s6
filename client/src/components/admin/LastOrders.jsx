import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";

const LastOrders = () => {
  const history = useHistory();
  const { orders } = useSelector((state) => state.dashboard);
  console.log(orders[0]);
  return (
    <div className="last-orders">
      <h5 className="head">Last orders</h5>
      <div className="container">
        {orders.slice(0, 3).map((order) => (
          <div
            className="order-item"
            onClick={() => history.push("/readers/" + order.user.username)}
          >
            <Avatar src={order.user.picture} alt={order.user.name}>
              {order.user.name[0]}
            </Avatar>
            <h5>{order.user.name}</h5>
            <h5>@{order.user.username}</h5>
            <h5>{order.total.toFixed(2)}$</h5>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LastOrders;
