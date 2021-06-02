import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { CustomAlert, CustomizedButton } from "..";
import {
  adminDeleteOrder,
  adminUpdateDeliveringState,
} from "../../helpers/axios.helpers";
import {
  deleteOrder,
  setNewOrderState,
} from "../../redux/actions/adminActions";
const Orders = () => {
  const sectionInitialStale = {
    delivered: false,
    delivering: false,
  };
  const alertinitialState = {
    open: false,
    message: "",
    actionDone: false,
  };
  const dispatch = useDispatch();
  const {
    dashboard: { orders },
    user: { accessToken },
  } = useSelector((state) => state);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sectionState, setSectionState] = useState(sectionInitialStale);
  const [alertState, setAlertState] = useState(alertinitialState);
  const DelivereingActions = ({ order: { _id, delivered, delivering } }) => {
    return (
      <div>
        {!delivered && (
          <CustomizedButton
            disabled={isProcessing}
            onClick={() => {
              setIsProcessing(true);
              setAlertState(alertinitialState);
              let action = delivering
                ? { delivering: false, delivered: true }
                : { delivering: true, delivered: false };
              console.log(_id);
              adminUpdateDeliveringState(
                { order_id: _id, action },
                accessToken
              ).then((res) => {
                if (res) {
                  dispatch(setNewOrderState({ _id, updatedOrder: res }));
                }
                setAlertState({
                  open: true,
                  message: res
                    ? `The order has moved to the ${
                        !delivering ? "Delivering" : "Delivered"
                      } section.`
                    : "Something went wrong, just try another time.",
                  actionDone: !!res,
                });
                setIsProcessing(false);
              });
            }}
          >
            {delivering ? "Delivered" : "Deliver"}
          </CustomizedButton>
        )}
        <CustomizedButton
          onClick={() => {
            if (!window.confirm("Are you sure you want to delete this order ?"))
              return;
            setAlertState(alertinitialState);
            adminDeleteOrder(_id, accessToken).then((data) => {
              dispatch(deleteOrder({ order_id: data.order_id }));
              if (!data.order_id) return;
              setAlertState({
                open: true,
                message: "The order has been deleted seccussfully",
                actionDone: true,
              });
            });
          }}
        >
          Delete
        </CustomizedButton>
      </div>
    );
  };
  return (
    <div>
      <div className="sections">
        <ul>
          <li
            onClick={() => {
              setSectionState(sectionInitialStale);
            }}
          >
            New
          </li>
          <li
            onClick={() => {
              setSectionState({
                delivered: false,
                delivering: true,
              });
            }}
          >
            Delivering
          </li>
          <li
            onClick={() => {
              setSectionState({
                delivered: true,
                delivering: false,
              });
            }}
          >
            Delivered
          </li>
        </ul>
      </div>
      <div className="orders-container">
        {orders.map(({ _id, user, total, delivered, delivering }) =>
          sectionState.delivered === delivered &&
          sectionState.delivering === delivering ? (
            <div key={_id} className="order-item">
              <div>ORDER ID: {_id}</div>
              <div className="order-item-header">
                <Avatar src={user.picture} alt={user.name}>
                  {user.name[0].toUpperCase()}
                </Avatar>
                <div className="detail">
                  <h3>{user.name}</h3>
                  <h6>ID: {_id}</h6>
                  <h6>{user.email}</h6>
                  <h6
                    style={{ backgroundColor: user.active ? "green" : "red" }}
                  >
                    Active
                  </h6>
                </div>
                <DelivereingActions order={{ _id, delivered, delivering }} />
              </div>
              <div>
                {(delivered && "Delivered") ||
                  (delivering && "Delivering") ||
                  "In the qeue"}
              </div>
            </div>
          ) : null
        )}
      </div>
      {alertState.open && (
        <CustomAlert
          message={alertState.message}
          severity={alertState.actionDone ? "success" : "error"}
        />
      )}
    </div>
  );
};
export default Orders;
