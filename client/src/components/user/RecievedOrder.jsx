import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const RecievedOrder = ({ order: { _id, books, total } }) => {
  const history = useHistory();
  const {
    user: { credentials },
  } = useSelector((state) => state);
  return (
    <div className="recieved-order">
      <div className="rc-header">
        <h1>Thank you {credentials?.name.split(" ")[0]}</h1>
        <h5>Your order has been received successfully, we appreciate your dealing with us, we encourage you for reading more books.</h5>
        <h6>You'll get the notification about the delivering date as soon as possible, stay in touch.</h6>
      </div>
      <div key={_id} className="order-item">
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
      </div>
    </div>
  );
};
export default RecievedOrder;
