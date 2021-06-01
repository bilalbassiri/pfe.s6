import React from "react";
import StarIcon from "@material-ui/icons/Star";
import { useHistory } from "react-router";
import { CircularProgress } from "..";

const MiniBookCard = ({ title, books }) => {
  const history = useHistory();
  return (
    <div className="other-books">
      <h1 className="title">{title}</h1>
      {books ? (
        books.map((item) => (
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  {item.rating.toFixed(1)}
                  <StarIcon style={{ fontSize: ".9rem" }} />
                </div>
                <div>{item.price}$</div>
                <div>{item.quantity} in stock</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <CircularProgress plan={{ h: "300px", w: "100%" }} />
      )}
    </div>
  );
};
export default MiniBookCard;
