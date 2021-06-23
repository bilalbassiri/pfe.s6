import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { CustomAlert, CustomizedButton } from "..";
import { useHistory } from "react-router-dom";
import {
  adminDeleteOrder,
  adminUpdateDeliveringState,
} from "../../helpers/axios.helpers";
import {
  deleteOrder,
  setNewOrderState,
} from "../../redux/actions/adminActions";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ClearIcon from "@material-ui/icons/Clear";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const styles = {
  btn: {
    fontSize: ".75rem",
    fontWeight: "600",
  },
};
const Orders = () => {
  const history = useHistory();
  const sectionInitialStale = {
    delivered: false,
    delivering: false,
    index: 0,
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
      <div className="orders-footer">
        <div>
          {!delivered && (
            <CustomizedButton
              style={styles.btn}
              disabled={isProcessing}
              disableElevation
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
            style={styles.btn}
            disableElevation
            onClick={() => {
              if (
                !window.confirm("Are you sure you want to delete this order ?")
              )
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <FiberManualRecordIcon
            style={{
              color:
                (delivered && "green") || (delivering && "orange") || "red",
            }}
          />
          {(delivered && "Delivered") ||
            (delivering && "Delivering") ||
            "In the qeue"}
        </div>
      </div>
    );
  };
  const getSectionStyle = (index) => ({
    borderBottomColor: sectionState.index === index ? "#2a9d8f" : "#cad1d0",
    color: sectionState.index === index ? "#262626" : "#cad1d0",
  });
  useEffect(() => {
    document.title = "Orders | Admin | Kafka";
  }, []);
  return (
    <div className="orders">
      <div className="sections">
        <ul>
          <li
            style={getSectionStyle(0)}
            onClick={() => {
              setSectionState(sectionInitialStale);
            }}
          >
            All
          </li>
          <li
            style={getSectionStyle(1)}
            onClick={() => {
              setSectionState({
                delivered: false,
                delivering: false,
                index: 1,
              });
            }}
          >
            To Deliver
          </li>
          <li
            style={getSectionStyle(2)}
            onClick={() => {
              setSectionState({
                delivered: false,
                delivering: true,
                index: 2,
              });
            }}
          >
            Delivering
          </li>
          <li
            style={getSectionStyle(3)}
            onClick={() => {
              setSectionState({
                delivered: true,
                delivering: false,
                index: 3,
              });
            }}
          >
            Delivered
          </li>
        </ul>
      </div>
      <div className="orders-container">
        {orders.map(
          ({ _id, user, books, total, delivered, delivering, createdAt }) =>
            (sectionState.delivered === delivered &&
              sectionState.delivering === delivering) ||
            sectionState.index === 0 ? (
              <div key={_id} className="order-item">
                <div className="bar">
                  <h6>ORDER ID: {_id}</h6>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: ".9rem",
                    }}
                  >
                    <ScheduleIcon
                      style={{ fontSize: "1.2rem", marginRight: 5 }}
                    />
                    {new Date(createdAt).toDateString()}
                  </div>
                </div>
                <div className="order-item-header">
                  <div className="credentials">
                    <Avatar src={user.picture} alt={user.name}>
                      {user.name[0].toUpperCase()}
                    </Avatar>
                    <div>
                      <h3
                        className="name"
                        onClick={() =>
                          history.push("/readers/" + user.username)
                        }
                      >
                        {user.name}
                      </h3>
                      <h6>ID: {user._id}</h6>
                      <h6>{user.email}</h6>
                    </div>
                  </div>
                  <div>
                    <h6
                      className="active"
                      style={{
                        backgroundColor: user.active ? "#1f776d" : "#f50057red",
                      }}
                    >
                      Active
                    </h6>
                  </div>
                </div>
                <div className="content">
                  {books.map((book) => (
                    <div className="book" key={book._id}>
                      <div className="quantity">
                        <ClearIcon className="icon" />
                        <p>{book.inCart}</p>
                      </div>
                      <div className="booky">
                        <img src={book.cover} alt={book.name} />
                        <div className="detail">
                          <h3
                            className="name"
                            onClick={() => history.push("/book/" + book._id)}
                          >
                            {book.name}
                          </h3>
                          <h5>Written by {book.author}</h5>
                          <h6>ID: {book._id}</h6>
                        </div>
                      </div>
                      <div className="price">
                        {book.inCart + " x " + book.price.toFixed(2) + "$ ="}
                        <span>{(book.inCart * book.price).toFixed(2)}$</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="total">
                  <p>Total</p>
                  <h3>{total.toFixed(2)} $</h3>
                </div>
                <DelivereingActions order={{ _id, delivered, delivering }} />
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
