import { Chip } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { Rating } from "..";

const SearchResult = ({ books }) => {
  const history = useHistory();
  const len = books?.length;
  const getDescription = (desc) => {
    const Elm = document.createElement("div");
    Elm.innerHTML = desc;
    return Elm.innerText.substring(0, 100) + "...";
  };
  return (
    <>
      {len > 1 ? <h3>{len} results</h3> : null}
      <div className="search-result-container">
        {books.map((book) => (
          <div key={book._id} className="book-item-result">
            <div className="cover">
              <img src={book.cover} alt={book.name} />
            </div>
            <div className="detail">
              <div className="top">
                <div className="name">
                  <h3 onClick={() => history.push("/book/" + book._id)}>
                    {book.name}
                  </h3>
                  <h5>{book.author}</h5>
                </div>
                <h5 className="price">{book.price.toFixed(2)}</h5>
              </div>
              <div className="des">{getDescription(book.description)}</div>
              <div className="genres">
                {book.genres.map((genre, index) => (
                  <Chip
                  size="small"
                    key={index}
                    label={genre}
                    onClick={() => {
                      history.push("/genres/" + genre);
                    }}
                  />
                ))}
              </div>
              <div className="info">
                <Rating
                  rating={book.rating}
                  count={book.rating_count}
                  porpose="global_read"
                  className="rating"
                />
                <h5>{book.quantity} in stock</h5>
                <h5>{book.sales} sales</h5>
                <h5>{book.language}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default SearchResult;
