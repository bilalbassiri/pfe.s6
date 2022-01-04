import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Skeleton from "@material-ui/lab/Skeleton";
import { Rating } from "@material-ui/lab";

const MiniBookCard = ({ title, books }) => {
  const history = useHistory();
  const { currentBook } = useSelector((state) => state.books);
  return (
    <div className="other-books">
      <h1 className="title">{title}</h1>
      {books?.length ? (
        books
          .filter((book) => book._id !== currentBook._id)
          .slice(0, title === "Similar" ? 7 : 5)
          .map((item) => (
            <div
              key={item._id}
              className="other-books-item"
              onClick={() => history.push("/book/" + item._id)}
            >
              <div className="cvr">
                <img src={item.cover} alt={item.name} />
              </div>
              <div className="detail">
                <h1>{item.name}</h1>
                <h4>{item.author}</h4>
                <div className="nbrs">
                  <Rating
                    name="read-only"
                    value={item.rating}
                    readOnly
                    style={{ fontSize: ".8rem", color: "#616161" }}
                  />
                  <div>{item.price.toFixed(2)}$</div>
                  <div>{item.quantity} in stock</div>
                </div>
              </div>
            </div>
          ))
      ) : (
        <>
          <Skeleton
            variant="rect"
            width={"100%"}
            height={80}
            style={{ borderRadius: 15 }}
          />
          <Skeleton
            variant="rect"
            width={"100%"}
            height={80}
            style={{ borderRadius: 15 }}
          />
          <Skeleton
            variant="rect"
            width={"100%"}
            height={80}
            style={{ borderRadius: 15 }}
          />
          <Skeleton
            variant="rect"
            width={"100%"}
            height={80}
            style={{ borderRadius: 15 }}
          />
          <Skeleton
            variant="rect"
            width={"100%"}
            height={80}
            style={{ borderRadius: 15 }}
          />
        </>
      )}
    </div>
  );
};
export default MiniBookCard;
